const NotesObj = new Notes();
  window.onload = getAllNotes()

 let notesArea = document.getElementById('notes')

 reverseBtn.onclick = reverseOrder
 clearAllBtn.onclick = clearAllNotes


async function clearAllNotes(){

    if(confirm('are you sure')){

     let request = await NotesObj.clear()
    request.onsuccess = () => {
 notesArea.innerHTML = ""   
    }
} else {
    return false
}}
 
  async function reverseOrder(){
      NotesObj.reverseOrder = !NotesObj.reverseOrder
      getAllNotes()
  }
document.addEventListener('submit' , (e) => {
e.preventDefault();
let target = e.target

if(target && target.classList.contains('add-note')){
   addNote(target)
}else if(target && target.classList.contains('update-note')){
let note = {id: parseInt(target.dataset.id), text: target.querySelector('textarea').value}
updateNote(note)
}
})
document.addEventListener('click' , (e) => {
    let {target} = e 
if(target && target.classList.contains('delete')){
    let noteId = parseInt(target.dataset.id)
    deleteNote(noteId)} else if(target && target.classList.contains('edite')){
     
         //let noteId = parseInt(target.dataset.id)
       // deleteNote(noteId)}
       editNote(target)
       

}}) 
 async function addNote(target){
    let textarea = target.querySelector('textarea')
    let newNote = textarea.value
    let add = await NotesObj.add({text:newNote})
    add.onsuccess=() => {
        getAllNotes()
        textarea.value=''
    }
 } 
async function deleteNote(noteId){

    if(confirm('Are you sure')){
        let deleteRequest = await NotesObj.delete(noteId)
        document.getElementById('note-'+noteId).remove()
    }else{
        return false
    }
}
    function editNote(note){
        let noteContainer = document.getElementById('note-'+note.dataset.id)
        let oldText = noteContainer.querySelector('.text').innerText

      let form = `<form class="update-note" data-id="${note.dataset.id}">
      <textarea>${oldText}</textarea>
      <button class="btn" type="submit">تحديث </button>
      </form>` 
      noteContainer.innerHTML = form
   
}
async function updateNote(note){
    let updateRequest =  NotesObj.update(note)
    updateNote.onsuccess=getAllNotes; 

}
async function getAllNotes(){
    let request = await NotesObj.all()
    
    let notesArray =[]
 

     request.onsuccess = () => {
    
        let cursor = request.result
         if(cursor){
            notesArray.push(cursor.value)
             cursor.continue()
         }else{
            displayNotes(notesArray)
         }
     }
}
function displayNotes(notes){
let ulElement = document.createElement('ul')
 
//create loop 
for(let i=0 ; i < notes.length ; i++){
  //we need element here
  let liElement = document.createElement('li')
  let note = notes[i]
  liElement.classList = 'note'
  liElement.id = 'note-'+note.id
  liElement.innerHTML = `<div><img src="imgs/edit-icon.png"  data-id="${note.id}" class="edite">
                                        <img src="imgs/delete-icon.png" class="delete" data-id="${note.id}">
                                   <div class="text">${note.text}</div> </div>`

ulElement.append(liElement)  }

document.getElementById('notes').innerHTML=''
document.getElementById('notes').append(ulElement)
}
async function clearAll(){
    let request = await NotesObj.clear()
}
//clearAll()
//getAllNotes()
//deleteNote(4)
//updateNote({text:'mohamed', id: 2 })
 //addNote()

