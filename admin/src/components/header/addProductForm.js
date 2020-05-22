import React, { useState, useEffect, useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useDropzone } from 'react-dropzone'

import { Form, Input, InputNumber, Select, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Option } = Select;

const ADD_PRODUCT = gql`

        mutation ($title: String!, $description: String, $price: Int, $image: Upload!) {
            addProduct(
                input: {
                    title: $title,
                    description: $description,
                    price: $price,
                    image: $image
                }
            ) {
                id
                title
                image
            }
        }
    `;

const UPLOAD_FILE = gql`
    mutation ($file: Upload!) {
        singleUpload(file: $file) 
    }
  `;

const AddProductForm = ({ cancel }) => {
    const [dWidth, setWidth] = useState(0);
    const [formRef, setFormRef] = useState(null);
    const [files, setFiles] = useState([]);

    const [mutate, { loading, error, data }] = useMutation(ADD_PRODUCT);

    const saveFormRef = useCallback(node => {
        if (node !== null) {
            setFormRef(node);
        }
    }, []);

    useEffect(() => {
        setWidth(document.querySelector('.ant-drawer-body').offsetWidth);
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [dWidth])


    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));

    }, [])

    const submitHandle = () => {

        const data = formRef.getFieldValue()

        data.image = files[0];

        //formRef.resetFields();

        mutate({ variables: data });
    }

    const previewThumb = files.map(file => (
        <div key={file.name}>
            <img
                src={file.preview}
                width="200"
                height="200"
            />
        </div>
    ));

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/png',
        multiple: false
    });

    return (
        <Form onFinish={submitHandle} ref={saveFormRef} layout="vertical" size="large">
            <Form.Item

            >
                <div className="image-uploader" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <InboxOutlined size="large" />
                    {
                        isDragActive ?
                            <p className="ant-upload-text">Drop the files here ...</p> :
                            <p className="ant-upload-text"><span>Drag/Upload</span> your image here.</p>
                    }
                </div>

                <div className="upload-preview-img">
                    {previewThumb}
                </div>
            </Form.Item>

            <Form.Item
                label="Title"
                name="title"
            >
                <Input name="title" />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                size="large"
            >
                <Input.TextArea name="description" />
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
            // rules={[{ required: true, message: ' ' }]}
            >
                <InputNumber type="number" style={{ width: '100%' }} name="price" />
            </Form.Item>

            <Form.Item
                label="Category"
                name="category"
            >
                <Select
                    placeholder="Product Category"
                    allowClear
                >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                </Select>
            </Form.Item>

            <footer className="ant-drawer-footer" style={{ width: dWidth }}>
                <Button block={true} type="link" danger onClick={cancel}>Cancel</Button>
                <Button block={true} type="primary" htmlType="submit" className="button" size="large">Create Product</Button>
            </footer>
        </Form>
    )
}

export default AddProductForm;