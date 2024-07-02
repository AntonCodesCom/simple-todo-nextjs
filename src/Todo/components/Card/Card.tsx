'use client';
import TodoItem from '~/Todo/types/Item';
import { useState } from 'react';
import TodoCardDelete from './Delete';
import TodoCardCheck from './Check';
import TodoCardEdit from './Edit';
import { toggleTodo } from './actions';

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
  // const updateFetcher = useFetcher();
  // const deleteFetcher = useFetcher();
  // const loading = checkLoading || updateLoading || deleteLoading;
  const [loading, setLoading] = useState(false);
  const deleteLoading = false; // TODO
  const [_label, setLabel] = useState(label);

  async function handleCheckToggle(_done: boolean) {
    if (loading) {
      return;
    }
    setLoading(true);
    await toggleTodo(id, _done);
    setLoading(false);
  }

  function handleEdit(updatedLabel: string) {
    if (loading) {
      return;
    }
    setEditingActive(false);
    setLabel(updatedLabel);
    // updateFetcher.submit(
    //   {
    //     label: updatedLabel,
    //   },
    //   { action: `update/${id}`, method: 'POST' },
    // );
  }

  function handleDelete() {
    if (loading) {
      return;
    }
    // deleteFetcher.submit(
    //   {},
    //   {
    //     action: `delete/${id}`,
    //     method: 'POST',
    //   },
    // );
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
