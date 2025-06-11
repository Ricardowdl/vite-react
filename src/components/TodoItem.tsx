import { Box, Checkbox, HStack, IconButton, Text, Select } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { DeleteIcon } from '@chakra-ui/icons'
import { Todo, useTodoStore } from '../store/todoStore'

const MotionBox = motion(Box)

interface TodoItemProps {
    todo: Todo
}

export const TodoItem = ({ todo }: TodoItemProps) => {
    const { toggleTodo, deleteTodo, updateTodoPriority } = useTodoStore()

    return (
        <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            layout
            p={4}
            bg="white"
            borderRadius="lg"
            boxShadow="sm"
            mb={2}
        >
            <HStack spacing={4} align="center">
                <Checkbox
                    isChecked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    colorScheme="green"
                />
                <Box flex={1}>
                    <Text
                        fontSize="md"
                        textDecoration={todo.completed ? 'line-through' : 'none'}
                        color={todo.completed ? 'gray.500' : 'gray.700'}
                    >
                        {todo.title}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                        {format(new Date(todo.createdAt), 'yyyy-MM-dd HH:mm')}
                    </Text>
                </Box>
                <Select
                    size="sm"
                    width="100px"
                    value={todo.priority}
                    onChange={(e) => updateTodoPriority(todo.id, e.target.value as Todo['priority'])}
                >
                    <option value="low">低优先级</option>
                    <option value="medium">中优先级</option>
                    <option value="high">高优先级</option>
                </Select>
                <IconButton
                    aria-label="删除任务"
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => deleteTodo(todo.id)}
                />
            </HStack>
        </MotionBox>
    )
} 