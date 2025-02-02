import { useEffect, useState } from 'react';
import { Button, notification, Space, Table, TablePaginationConfig, Typography } from 'antd';
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditFilled } from '@ant-design/icons';
import Layout from "../../../components/Layout";
import AddProductModal from "../add-product-modal";
import { Category, Product } from "../../../types";
import FilterProduct from "../filter";
import api from "../../../api/api.client.ts";
import debounce from 'lodash.debounce';

const { Title } = Typography;

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchProductsDebounced = debounce(() => fetchProducts(), 200);
  const fetchCategoriesDebounced = debounce(() => fetchCategories(), 200);

  useEffect(() => {
    fetchProductsDebounced();
    fetchCategoriesDebounced();
  }, [searchText, selectedCategory, sortField, sortOrder]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products', {
        params: {
          sortField,
          sortOrder: sortOrder === 'ascend' ? 'asc' : 'desc',
          name: searchText || undefined,
          categoryId: selectedCategory || undefined,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const showModal = (product: Product | null) => {
    setEditingProduct(product);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/products/${id}`).then(() => {
      notification.success({
        message: 'Product deleted!'
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

    await fetchProducts();
  };

  const handleTableChange = (_pagination: TablePaginationConfig, _filters: any, sorter: any) => {
    setSortField(sorter.columnKey || 'name');
    setSortOrder(sorter.order || 'asc');
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: true,
      render: (price: number) => `$ ${price.toFixed(2)}`,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category.name',
      sorter: true,
      render: (category: Category) => category.name,
    },
    {
      title: 'Category Path',
      dataIndex: 'category',
      key: 'category.categoryPath',
      render: (category: Category) => category.categoryPath,
    },
    {
      title: 'Available',
      dataIndex: 'available',
      key: 'available',
      render: (available: boolean) => (
          available
              ? <CheckOutlined style={{ color: "green", fontSize: "20px" }} />
              : <CloseOutlined style={{ color: "red", fontSize: "20px" }} />),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: string, record: Product) => (
          <Space>
            <Button icon={<EditFilled style={{ fontSize: "20px" }} />} onClick={() => showModal(record)} />
            <Button icon={<DeleteOutlined style={{ fontSize: "20px" }} />} onClick={() => handleDelete(record.id)} />
          </Space>
      ),
    },
  ];

  return (
      <Layout>
        <Title level={2}>Products</Title>

        <FilterProduct
            setSearchText={setSearchText}
            setSelectedCategory={setSelectedCategory}
            showModal={showModal}
            categories={categories}
        />

        <Table
            columns={columns}
            dataSource={products}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            onChange={handleTableChange}
            bordered
        />

        <AddProductModal isModalVisible={isModalVisible}
                         setIsModalVisible={setIsModalVisible}
                         editingProduct={editingProduct}
                         setEditingProduct={setEditingProduct}
                         fetchProducts={fetchProducts}
                         categories={categories}
        />
      </Layout>
  );
};

export default Products;
