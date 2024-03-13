import { useEffect, useState } from 'react'
import NoteItem from './NoteItem'
import FormTambah from './FormTambah'
import FormEdit from './FormEdit'
import { addNote, deleteNote, editNote, tampilkan } from './api'

function Note() {
  const [notes, setNotes] = useState([])
  const [currentNoteId, setCurrentNoteId] = useState(null)

  const handleFetchData = async () => {
    const apiFetch = await tampilkan();
    setNotes(apiFetch.data.data ?? null)
  }

  const handleAddData = async (title,content) => {
    await addNote(title,content)
    handleFetchData()
  }
 
  const handleUpdate = async (id,title,content,writer) => {
    await editNote(id,title,content,writer)
    handleFetchData()
  }

  const handleDelete = async (id) => {
    await deleteNote(id);
    handleFetchData()
  }

  const Edit = (id) => {
    setCurrentNoteId(id)
  }

  const cancelEdit = () => {
    setCurrentNoteId(null);
  }

  useEffect(() => {
    handleFetchData()
  }, [])


  return (
    <>
      <div className='mx'>
        <div className="App w-[100%] flex flex-col items-center">
          <h1 className='text-center text-4xl p-5 text-white' >Notes</h1>
          {currentNoteId ? <FormEdit onEdit={handleUpdate} targetValue={notes !== null ? notes.filter(e => e.id === currentNoteId)[0] : null} notes={notes} onCancel={cancelEdit} /> : <FormTambah onAdd={handleAddData} onCancel={cancelEdit} />}

          <div className='flex flex-row flex-wrap justify-center'>
            {notes !== null ? notes.map((note) => (
              <NoteItem
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                onDelete={handleDelete}
                onEdit={Edit} />
            )) : null}
          </div>
        </div>
      </div>

    </>
  )

}


export default Note;