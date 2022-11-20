import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { auth, db } from '../firebase-client/config'
import { getDocs, query, collection, where } from 'firebase/firestore'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Text, Spinner, Center} from '@chakra-ui/react'
import {
  Button,
  Heading,
  useToast,
} from '@chakra-ui/react'

import NextLink from 'next/link'


const Reviews = () => {
  const router = useRouter()
  const toast = useToast()

  const [loading, setLoading] = useState(true)
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/')
      } else {
        const querySnapshot = await getDocs(
            query(
              collection(db, 'users'),
              where('userType', '==', 'Doctor'),
            ),
          )
          setDoctors(querySnapshot.docs.map((doc) => doc.data()))
          setLoading(false)      
        }})

    return () => unsubscribe()
  }, [])


  if (loading) {
    return (
      <Center marginTop={20}>
        <Spinner size="xl" />
      </Center>
    )
  }

  return (
    <div style={{
        display:'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 10
    }}>
        {doctors.map(doctor => (
            <NextLink href={`/view-reviews/${doctor.uid}`} passHref>
                <SimpleGrid spacing={4} margin='10' templateColumns='repeat(auto-fill, minmax(340px, 1fr))'>
                <Card boxShadow= '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'>
                    <CardHeader>
                    <Heading size='md' align='center' key={doctor.uid}>{doctor.firstName} {doctor.lastName}</Heading>
                    </CardHeader>
                    <CardBody>
                    <Text align='center'>View this doctor's reviews.</Text>
                    </CardBody>
                    <CardFooter>
                        <Button colorScheme='blue' margin='0 auto'>View here</Button>
                    </CardFooter>
                </Card>
                </SimpleGrid> 
            </NextLink>        
        ))}
    </div>
  )
}

export default Reviews
