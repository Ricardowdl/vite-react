import { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Input,
  Button,
  VStack,
  HStack,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import { TodoItem } from './components/TodoItem'
import { useTodoStore } from './store/todoStore'

function App() {
  const [newTodo, setNewTodo] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const { todos, addTodo } = useTodoStore()
  const toast = useToast()

  const handleAddTodo = () => {
    if (!newTodo.trim()) {
      toast({
        title: '错误',
        description: '请输入任务内容',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
      return
    }

    addTodo(newTodo.trim(), priority)
    setNewTodo('')
    toast({
      title: '成功',
      description: '任务已添加',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Heading>高级待办事项</Heading>

        <Box w="100%" p={6} bg="white" borderRadius="lg" boxShadow="md">
          <VStack spacing={4}>
            <HStack w="100%">
              <Input
                width="65%"
                placeholder="输入新的任务..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
              />
              <Select
                width="120px"
                value={priority}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setPriority(e.target.value as 'low' | 'medium' | 'high')}
              >
                <option value="low">低优先级</option>
                <option value="medium">中优先级</option>
                <option value="high">高优先级</option>
              </Select>
              <Button colorScheme="blue" onClick={handleAddTodo}>
                添加
              </Button>
            </HStack>
          </VStack>
        </Box>

        <Box w="100%">
          <Text mb={4} fontSize="lg" fontWeight="bold">
            任务列表 ({todos.length})
          </Text>
          <AnimatePresence>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </AnimatePresence>
        </Box>
      </VStack>
    </Container>
  )
}

export default App
