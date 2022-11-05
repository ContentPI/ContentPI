import { mergeTypeDefs } from '@graphql-tools/merge'
import Query from './Query'
import Scalar from './Scalar'

export default mergeTypeDefs([Query, Scalar])
