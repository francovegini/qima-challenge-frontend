import { Button, Form, Input, InputNumber, Modal, notification, Select, Switch } from "antd";
import api from "../../../api/api.client.ts";
import { Category, Product } from "../../../types";
import { useEffect } from "react";

type AddProductModalProps = {
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
  editingProduct: Product | null;
  setEditingProduct: (value: Product | null) => void;
  fetchProducts: () => Promise<void>;
  categories: Category[];
};

const AddProductModal = ({
   isModalVisible,
   setIsModalVisible,
   editingProduct,
   setEditingProduct,
   fetchProducts,
   categories,
}: AddProductModalProps) => {

  const [form] = Form.useForm();

  useEffect(() => {
    if (editingProduct) {
      form.setFieldsValue({
        ...editingProduct,
        categoryId: editingProduct.category?.id,
      });
    }
  }, [editingProduct, form]);

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
    form.resetFields();
  };

  const saveProduct = async (value: Product) => {
    await api.post('/products', value)
        .then(() => {
          notification.success({
            message: 'Product created!'
          });
        }).catch((err) => {
          if (err.response.status === 403) {
            notification.warning({
              message: 'User without permission!'
            });
          } else {
            notification.error({
              message: 'Error deleting product!'
            });
          }
        });
  }

  const updateProduct = async (value: Product) => {
    await api.put(`/products/${editingProduct?.id}`, value)
        .then(() => {
          notification.success({
            message: 'Product updated!'
          });
        })
        .catch((err) => {
          if (err.response.status === 403) {
            notification.warning({
              message: 'User without permission!'
            });
          } else {
            notification.error({
              message: 'Error deleting product!'
            });
          }
        });
  }

  const handleFinish = async (value: Product) => {
    if (editingProduct) {
      await updateProduct(value);
    } else {
      await saveProduct(value);
    }

    await fetchProducts();

    handleCancel();
  };

  return (
      <Modal
          title={editingProduct ? 'Edit Product' : 'Add Product'}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          centered
      >
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Category" name="categoryId"
                     rules={[{ required: true, message: 'Category is required' }]}>
            <Select placeholder="Choose a category">
              {categories.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Description" name="description"
                     rules={[{ required: false }]}>
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Price is required' }]}>
            <InputNumber
                min={0}
                style={{ width: '100%' }}
                onKeyDown={(e) => {
                  if (!/[\d.]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                    e.preventDefault();
                  }
                }}
            />
          </Form.Item>

          <Form.Item label="Stock quantity" name="stockQuantity" rules={[{ required: false }]}>
            <InputNumber
                min={0}
                onKeyDown={(e) => {
                  if (!/[\d.]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                    e.preventDefault();
                  }
                }}
                style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Available" name="available" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingProduct ? 'Update product' : 'Save product'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
  )
}

export default AddProductModal;