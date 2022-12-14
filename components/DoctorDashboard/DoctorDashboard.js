import {
  Text,
  Heading,
  Stack,
  Flex,
  Wrap,
  WrapItem,
  Center,
} from '@chakra-ui/react'
import PendingRequests from './PendingRequests'
import ViewProfile from './ViewProfile'

const DoctorDashboard = ({ user }) => {
  return (
    <Flex
      flexDir={'column'}
      minH={'100vh'}
      px={{ base: 2, md: 20 }}
      pt={20}
      bg={'gray.50'}
    >
      <Stack spacing={20}>
        <Heading>Hello {user['firstName']}.</Heading>
        <Wrap justify={{ base: 'center', md: 'left' }} spacing={10}>
          <ViewProfile user={user} />
          <PendingRequests user={user} />
        </Wrap>
      </Stack>
    </Flex>
  )
}

export default DoctorDashboard
