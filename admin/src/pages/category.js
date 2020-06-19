import React, { useRef, useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Layout, Button, Drawer, Typography, Form, Input, Table, Empty, notification, Space } from 'antd';
import { PlusOutlined, LeftOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { CATEGORY_LIST, ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, LOCAL_STATE_CATEGORIES } from './../graphql/queries';

const { Content } = Layout;
const openNotificationWithIcon = (type, description, message) => {
  notification[type]({
    message: message,
    description,
    duration: 3,
  });
};

function catList(items) {
  return items.map((el) => {
    return {
      ...el,
      key: el.id,
    };
  });
}

const Category = () => {
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [buttonState, setButtonState] = useState(null);
  const [editMode, setEditMode] = useState({
    mode: false,
    id: null,
  });
  const formRef = useRef(null);
  const focusInput = useRef(null);
  const [form] = Form.useForm();

  //APOLLO QUERY/MUTATION HOOK
  const { loading, data, client } = useQuery(CATEGORY_LIST);
  const [updateMutate] = useMutation(UPDATE_CATEGORY);
  const [addMutate] = useMutation(ADD_CATEGORY);
  const [deleteMutate, { error }] = useMutation(DELETE_CATEGORY);

  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (!loading) {
      const {
        category: { items },
      } = client.readQuery({ query: CATEGORY_LIST });

      setCategory(catList(items));
    }
  }, [data]);

  const columns = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Slug',
      key: 'slug',
      dataIndex: 'slug',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" size="medium" icon={<EditOutlined />} onClick={() => editHandle(record.id)}>
            Edit
          </Button>
          <Button
            type="primary"
            size="medium"
            loading={buttonState === record.id ? true : false}
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = async (id) => {
    setButtonState(id);
    try {
      await deleteMutate({
        variables: { id: id },
        update(client, result) {
          const allCategory = client.readQuery({ query: CATEGORY_LIST });
          allCategory.category.items = category.filter((c) => c.id !== id);
          client.writeQuery({
            query: CATEGORY_LIST,
            data: allCategory,
          });
          setCategory(catList(allCategory.category.items));
        },
      });
    } catch (err) {
      setButtonState(null);
      console.log(err.graphQLErrors[0]);
      openNotificationWithIcon('error', err.graphQLErrors[0].message, '403');
    }
  };

  const submitHandle = async (inputData) => {
    try {
      setLoader(true);

      await addMutate({
        variables: inputData,
        update: (cache, { data: { addCategory } }) => {
          const allCategory = cache.readQuery({ query: CATEGORY_LIST });

          allCategory.category.items = [addCategory, ...category];
          cache.writeQuery({
            query: CATEGORY_LIST,
            data: allCategory,
          });
        },
      });

      formRef.current.resetFields();

      openNotificationWithIcon('success', `${inputData.name} has been created`, 'Created');

      focusInput.current.focus();

      setLoader(false);
    } catch (err) {
      console.log(err.graphQLErrors[0]);
      openNotificationWithIcon('error', err.graphQLErrors[0].message, '403');
      setLoader(false);
    }
  };

  const updateHandle = async (inputData) => {
    try {
      setLoader(true);
      const { name } = inputData;
      const [cat] = category.filter((c) => c.id === editMode.id);

      await updateMutate({
        variables: { id: cat.id, name },
      });
      setEditMode({
        mode: false,
        id: null,
      });
      setLoader(false);
      openNotificationWithIcon('success', `category has been updated`, 'Updated');
      setVisible(false);
    } catch (err) {
      console.log(err.graphQLErrors[0]);
      openNotificationWithIcon('error', err.graphQLErrors[0].message, '403');
      setLoader(false);
    }
  };

  const editHandle = (id) => {
    setVisible(!visible);
    setEditMode({
      mode: true,
      id,
    });
    const [cat] = category.filter((c) => c.id === id);
    form.setFieldsValue({
      name: cat.name,
    });
  };

  const addCategoryHandle = () => {
    formRef.current ? formRef.current.resetFields() : null;
    setEditMode({
      mode: false,
      id: null,
    });
    setVisible(!visible);
  };

  return (
    <Content className="content-layout category-page">
      <header className="page-top-block--header">
        <Typography.Title level={4}>Category</Typography.Title>
        <Button type="primary" onClick={addCategoryHandle} className="button large" size="large">
          <PlusOutlined /> Add Category
        </Button>
      </header>

      <Drawer title="Add Category" placement="right" closable={true} onClose={() => setVisible(!visible)} visible={visible} className="drawer-block">
        <button type="button" className="btn back-arrow" onClick={() => setVisible(!visible)}>
          <LeftOutlined />
        </button>

        <Form onFinish={editMode.mode ? updateHandle : submitHandle} ref={formRef} layout="vertical" size="large" form={form}>
          <Form.Item label="Category Name" rules={[{ required: true, message: 'Category title is required' }]} name="name">
            <Input ref={focusInput} />
          </Form.Item>
          <footer className="ant-drawer-footer">
            <Button block={true} type="link" onClick={() => setVisible(!visible)} danger>
              Cancel
            </Button>
            <Button block={true} type="primary" htmlType="submit" className="button" size="large" loading={loader}>
              {editMode ? 'Update Category' : 'Create Category'}
            </Button>
          </footer>
        </Form>
      </Drawer>
      <Table className="table-block" columns={columns} dataSource={category} loading={loading} tableLayout="fixed" />
    </Content>
  );
};

export default Category;
