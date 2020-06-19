import React, { useState, useCallback, useRef, useContext, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useDropzone } from 'react-dropzone';

import { Form, Input, InputNumber, Select, Button, Skeleton, notification } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import GetCategory from '../../graphql/getCategory';
import { ADD_PRODUCT, PRODUCT_LIST, UPDATE_PRODUCT, PRODUCT } from '../../graphql/queries';

import { ProductContext } from './../../context/productContext';

const { Option } = Select;

const openNotificationWithIcon = (type, description, message) => {
  notification[type]({
    message: message,
    description,
    duration: 3,
  });
};

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [loader, setLoader] = useState(false);
  const [state, dispatch] = useContext(ProductContext);
  const formRef = useRef();
  const [form] = Form.useForm();

  const [addMutate] = useMutation(ADD_PRODUCT);
  const [updateMutate] = useMutation(UPDATE_PRODUCT);
  const { catLoading, category } = GetCategory();

  const { product } = state;

  useEffect(() => {
    if (product) {
      const [item] = product;

      form.setFieldsValue({
        title: item.title,
        price: item.price,
        description: item.description,
        category: item.category.map((cat) => cat.id),
      });
    } else {
      formRef.current.resetFields();
    }
  }, [product]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const submitHandle = async (inputData) => {
    if (product) {
      return updateHandle(inputData);
    }
    try {
      setLoader(true);
      inputData.image = files[0];

      await addMutate({
        variables: inputData,
        update: (client, { data: { addProduct } }) => {
          const allProduct = client.readQuery({
            query: PRODUCT_LIST,
          });
          const items = [addProduct, ...allProduct.products.items];
          client.writeQuery({
            query: PRODUCT_LIST,
            data: {
              products: {
                items,
                __typename: 'Items',
              },
              __typename: 'Products',
            },
          });
        },
      });

      openNotificationWithIcon('success', 'Product has been created', 'Created');

      // CLEAR FIELD
      formRef.current.resetFields();
      setFiles([]);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.log(err.graphQLErrors[0]);
      openNotificationWithIcon('error', err.graphQLErrors[0].message, '403');
    }
  };

  const updateHandle = async (inputData) => {
    try {
      setLoader(true);
      const [item] = product;
      inputData.image = files[0];
      await updateMutate({
        variables: { id: item.id, ...inputData },
      });
      openNotificationWithIcon('success', `product has been updated`, 'Updated');
      setLoader(false);
      dispatch({ type: 'CLOSE_DRAWER' });
    } catch (err) {
      setLoader(false);
      console.log(err.graphQLErrors[0]);
      openNotificationWithIcon('error', err.graphQLErrors[0].message, '403');
    }
  };

  const previewThumb = files.map((file) => (
    <div key={file.name}>
      <img src={file.preview} alt="" />
    </div>
  ));

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    multiple: false,
  });

  return (
    <Form onFinish={submitHandle} ref={formRef} layout="vertical" size="large" form={form}>
      <Form.Item>
        <div className="image-uploader" {...getRootProps()}>
          <input {...getInputProps()} />
          <InboxOutlined size="large" />
          {isDragActive ? (
            <p className="ant-upload-text">Drop the files here ...</p>
          ) : (
            <p className="ant-upload-text">
              <span>Drag/Upload</span> your image here.
            </p>
          )}
        </div>

        <div className="upload-preview-img">
          {files.length === 0 && product ? (
            <img src={`http://localhost:5050/${product[0].imagePath}/${product[0].image}`} alt={product[0].name} />
          ) : (
            previewThumb
          )}
        </div>
      </Form.Item>

      <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Title is required field!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Description" name="description" size="large">
        <Input.TextArea />
      </Form.Item>

      <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Price is required field!' }]}>
        <InputNumber type="number" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Category" name="category">
        {!catLoading ? (
          <Select placeholder="Product Category" allowClear mode="multiple">
            {category.map((cat) => (
              <Option key={cat.id} value={cat.id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        ) : (
          <Skeleton.Input style={{ width: '100%' }} active={true} />
        )}
      </Form.Item>

      <footer className="ant-drawer-footer">
        <Button block={true} type="link" danger onClick={() => dispatch({ type: 'CLOSE_DRAWER' })}>
          Cancel
        </Button>
        <Button block={true} type="primary" htmlType="submit" className="button" size="large" loading={loader}>
          Create Product
        </Button>
      </footer>
    </Form>
  );
};

export default AddProduct;
