'use client';
import TodoItem from '~/Todo/types/Item';
import { useState } from 'react';
import TodoCardDelete from './Delete';
import TodoCardCheck from './Check';
import TodoCardEdit from './Edit';
import { deleteTodo, editTodo, toggleTodo } from './actions';

// props
interface Props {
  todo: TodoItem;
}

/**
 * Todo card component.
 */
export default function TodoCard({ todo }: Props) {
  const { id, label } = todo;
  const [editingActive, setEditingActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [_label, setLabel] = useState(label);

  async function handleCheckToggle(_done: boolean) {
    if (loading) {
      return;
    }
    setLoading(true);
    await toggleTodo(id, _done);
    setLoading(false);
  }

  async function handleEdit(updatedLabel: string) {
    if (loading) {
      return;
    }
    setEditingActive(false);
    setLabel(updatedLabel);
    setLoading(true);
    await editTodo(id, updatedLabel);
    setLoading(false);
  }

  async function handleDelete() {
    if (loading) {
      return;
    }
    setLoading(true);
    setDeleteLoading(true);
    await deleteTodo(id);
    setDeleteLoading(false);
    setLoading(false);
  }

  return editingActive ? (
    <TodoCardEdit
      todo={todo}
      disabled={loading}
      onDeactivate={() => setEditingActive(false)}
      onEdit={handleEdit}
    />
  ) : (
    <TodoCardCheck
      todo={{ ...todo, label: _label }}
      deleteElement={
        <TodoCardDelete disabled={loading} onDelete={handleDelete} />
      }
      onEditClick={() => setEditingActive(true)}
      disabled={loading}
      deleting={deleteLoading}
      onCheckToggle={handleCheckToggle}
    />
  );
}
