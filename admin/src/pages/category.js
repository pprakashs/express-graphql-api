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
  const { loading, error, data, client } = useQuery(CATEGORY_LIST);
  const [updateMutate] = useMutation(UPDATE_CATEGORY);
  const [addMutate] = useMutation(ADD_CATEGORY);
  const [deleteMutate] = useMutation(DELETE_CATEGORY);

  const {
    data: {
      allCategory: { items: category },
    },
  } = useQuery(LOCAL_STATE_CATEGORIES);

  if (!loading) {
    const categoryList = data.category.items.map((el) => {
      return {
        ...el,
        key: el.id,
      };
    });

    client.writeData({
      data: {
        allCategory: {
          items: categoryList,
          __typename: 'Item',
        },
        __typename: 'Category',
      },
    });
  }

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
      });

      client.writeData({
        data: {
          category: {
            items: category.filter((c) => c.id !== id),
            __typename: 'Item',
          },
          __typename: 'Category',
        },
      });
    } catch (error) {
      //setLoader(visible);
    }
  };

  const submitHandle = async (inputData) => {
    try {
      setLoader(true);
      const updateCache = (cache, { data: { addCategory } }) => {
        cache.writeQuery({
          query: CATEGORY_LIST,
          data: {
            category: {
              items: [addCategory, ...category],
              __typename: 'Item',
            },
            __typename: 'Category',
          },
        });
      };

      await addMutate({
        variables: inputData,
        update: updateCache,
      });

      formRef.current.resetFields();

      openNotificationWithIcon('success', `${inputData.name} has been created`, 'Created');

      focusInput.current.focus();

      setLoader(false);
    } catch (error) {
      console.log(error);
      openNotificationWithIcon('error', `${inputData.name} ${error.message.split(':')[1]}`, 'Error');
      setLoader(false);
    }
  };

  const updateHandle = async (inputData) => {
    console.log(inputData);
    const { name } = inputData;
    const [cat] = category.filter((c) => c.id === editMode.id);

    const updateCache = (cache, { data: { updateCategory } }) => {
      updateCategory.key = updateCategory.id;
    };

    await updateMutate({
      variables: { id: cat.id, name },
      update: updateCache,
    });
    setEditMode({
      mode: false,
      id: null,
    });
    openNotificationWithIcon('success', `category has been updated`, 'Updated');
    setVisible(false);
  };

  const editHandle = (id) => {
    setVisible(!visible);
    setEditMode({
      mode: true,
      id,
    });
    console.log(editMode);
    const [cat] = category.filter((c) => c.id === id);
    form.setFieldsValue({
      name: cat.name,
    });
  };

  return (
    <Content className="content-layout category-page">
      <header className="page-top-block--header">
        <Typography.Title level={4}>Category</Typography.Title>
        <Button type="primary" onClick={() => setVisible(!visible)} className="button large" size="large">
          <PlusOutlined /> Add Category
        </Button>
      </header>

      <Drawer title="Add Category" placement="right" closable={true} onClose={() => setVisible(!visible)} visible={visible} className="drawer-block">
        <button type="button" className="btn back-arrow" onClick={() => setVisible(!visible)}>
          <LeftOutlined />
        </button>

        <Form onFinish={editMode ? updateHandle : submitHandle} ref={formRef} layout="vertical" size="large" form={form}>
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
