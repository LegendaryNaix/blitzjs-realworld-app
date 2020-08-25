import React from "react"
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Heading,
  useColorMode,
} from "@chakra-ui/core"
import MainLayout from "app/layouts/MainLayout"
import { useSession, useQuery, useRouter } from "blitz"
import getUser from "app/users/queries/getUser"
import Form from "app/components/Form"
import updateUser from "app/users/mutations/updateUser"
import { cardStyles } from "app/styles"

const SettingsPage = () => {
  const colorMode = useColorMode()
  const router = useRouter()
  const session = useSession()
  const [user] = useQuery(getUser, { where: { id: session.userId } }, { enabled: !!session.userId })

  const onSubmit = async ({ values }) => {
    try {
      await updateUser({
        where: {
          id: session?.userId,
        },
        data: values,
      })
      router.push(`/users/${user.id}`)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <MainLayout headTitle="Settings">
      <Flex flexDir="column" maxW="containers.lg" mx="auto">
        <Heading my="4">Settings</Heading>
        <Tabs w="100%" {...cardStyles(colorMode)}>
          <TabList w="100%">
            <Tab w="50%">Profile</Tab>
            <Tab w="50%">Password</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {user && (
                <Form
                  onSubmit={onSubmit}
                  defaultValues={{
                    name: user?.name,
                    email: user?.email,
                    bio: user?.bio,
                  }}
                  fields={{
                    name: {
                      name: "name",
                      label: "Name",
                      type: "text",
                      validation: { required: true },
                    },
                    bio: {
                      name: "bio",
                      label: "Bio",
                      type: "text",
                      validation: { required: false },
                    },
                    email: {
                      name: "email",
                      label: "Email",
                      type: "email",
                      validation: { required: true },
                      isDisabled: true,
                    },
                  }}
                />
              )}
            </TabPanel>
            <TabPanel>TODO!</TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </MainLayout>
  )
}

export default SettingsPage
