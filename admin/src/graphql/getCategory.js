import { useQuery } from '@apollo/react-hooks';
import { CATEGORY_LIST } from './queries';

const GetCategory = () => {
  const { loading, error, data, client } = useQuery(CATEGORY_LIST);
  if (loading) {
    return {
      catLoading: loading,
    };
  }
  return {
    category: data.category.items,
    catLoading: loading,
    catError: error,
    client,
  };
};

export default GetCategory;
