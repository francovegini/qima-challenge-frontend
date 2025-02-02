import { Button, Card, Input, Select, Space } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Category, Product } from "../../../types";
import { Dispatch, SetStateAction } from "react";

const { Search } = Input;

type ProductFilterProps = {
  setSearchText: Dispatch<SetStateAction<string>>;
  setSelectedCategory: Dispatch<SetStateAction<number>>;
  showModal: (product: Product | null) => void;
  categories: Category[];
}

const FilterProduct = ({
  setSearchText,
  setSelectedCategory,
  showModal,
  categories,
}: ProductFilterProps) => {

  return (
      <Card style={{ marginBottom: 16 }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Search
                placeholder="Search product name"
                onSearch={(value) => setSearchText(value)}
                enterButton={<SearchOutlined />}
                allowClear
                style={{ width: 250 }}
            />
            <Select
                placeholder="Filter by category"
                style={{ width: 200 }}
                onChange={(value) => setSelectedCategory(value)}
                allowClear
            >
              {categories.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
              ))}
            </Select>
          </Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal(null)}>
            Add Product
          </Button>
        </Space>
      </Card>
  )
}

export default FilterProduct;