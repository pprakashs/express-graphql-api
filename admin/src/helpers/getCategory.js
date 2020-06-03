import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
export const CATEGORY_LIST = gql`
  {
    category {
      result
      items {
        id
        name
        slug
      }
    }
  }
`;

const GetCategory = () => {
  const { loading, error, data } = useQuery(CATEGORY_LIST);
  if (loading) {
    return {
      catLoading: loading,
    };
  }
  return {
    category: data.category.items,
    catLoading: loading,
    catError: error,
  };
};

export default GetCategory;
