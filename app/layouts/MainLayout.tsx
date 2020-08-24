import React from "react"
import { Head, Link, Router, useRouter } from "blitz"
import {
  Flex,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Avatar,
  Button,
  Icon,
  useColorMode,
  IconButton,
  Heading,
} from "@chakra-ui/core"
import useAuthUser from "app/auth/hooks/useAuthUser"
import logout from "app/auth/mutations/logout"

const MainLayout = ({ children, headTitle = "Real World App" }) => {
  const [user] = useAuthUser()
  const router = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex flexDir="column">
        <Box
          bg={colorMode === "dark" ? "gray.800" : `bg-dark`}
          color={"text-light"}
          h="60px"
          as="nav"
        >
          <Flex h="100%" marginX="auto" maxW="containers.lg" justify="space-between" align="center">
            <Heading size="md">
              <Link href="/">Home</Link>
            </Heading>
            <Flex justify="space-between">
              {user ? (
                <>
                  <Button
                    onClick={() => router.push("/posts/create")}
                    mr="4"
                    bg="bg-light"
                    color="text-dark"
                  >
                    <Icon mr="2" name="add" />
                    Create Post
                  </Button>
                  <IconButton
                    aria-label="toggle-color-mode"
                    mr="2"
                    icon={colorMode === "light" ? "moon" : "sun"}
                    bg="bg-light"
                    color="text-dark"
                    onClick={() => {
                      toggleColorMode()
                    }}
                  >
                    Color Mode
                  </IconButton>
                  <Menu>
                    <MenuButton outline="none" as={Button} bg="primary">
                      <Avatar size="xs"></Avatar>
                    </MenuButton>
                    <MenuList color={colorMode === "light" ? "text-dark" : "text-light"}>
                      <MenuGroup>
                        <MenuItem>
                          <Link href="/users/[id]" as={`/users/${user.id}`}>
                            <Flex flexDir="column">
                              <Box py="1">{user.name}</Box>
                              <Box fontWeight="600" py="1">
                                {user.email}
                              </Box>
                            </Flex>
                          </Link>
                        </MenuItem>
                        <MenuItem py="4">
                          <Link href="/users/settings">
                            <Box>
                              <Icon mr="2" name="settings" />
                              Settings
                            </Box>
                          </Link>
                        </MenuItem>
                        <MenuItem
                          py="4"
                          onClick={async () => {
                            await logout()
                            Router.replace("/login")
                          }}
                        >
                          <>
                            <Icon mr="2" name="repeat" />
                            Log Out
                          </>
                        </MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <Flex align="center">
                  <Box mx={2}>
                    <Link href="/login">Login</Link>
                  </Box>
                  <Box mx={2}>
                    <Link href="/register">Register</Link>
                  </Box>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Box>
        <Box
          bg={colorMode === "light" ? "bg-light" : "bg-dark"}
          color={colorMode === "light" ? "text-dark" : "text-light"}
          h="calc(100vh - 60px)"
          overflowY="auto"
          as="main"
        >
          <Box h="100%" marginX="auto">
            {children}
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default MainLayout
