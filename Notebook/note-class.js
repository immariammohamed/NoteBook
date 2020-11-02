class Notes {
    
    dbVersion =1;
    dbName = 'myDatabase';
    reverseOrder = false
// connect to database using connect
    connect(){
     //return promise 
     return new Promise((resolve , reject) => {
         // to request open the indexdb
         const request = indexedDB.open(this.dbName , this.dbVersion)
         
         request.onupgradeneeded = () => {
// resposible of updates the object store
          let db = request.result
          if(!db.objectStoreNames.contains('notes')){
              db.createObjectStore('notes', {keyPath:'id' , autoIncrement:true})
          } 
         
         }
         request.onsuccess=() => resolve(request.result)
         request.onerror=() => reject(request.error.message)
         request.onblocked = () => console.log('Storage is blocked')
     })
    }
    //to reach the tore and give it to us
    //gives us the object store 
    async accessStore(accessType){
        let connect = await this.connect();
        let tx = connect.transaction('notes', accessType);
        return tx.objectStore('notes');
    }
 
       
         async add(note){
            let store = await this.accessStore('readwrite')
            return store.add(note);
         }
    //to give us everything in object store 
    async all(){
     let notes = await this.accessStore('readonly')
     return notes.openCursor(null, this.reverseOrder ? 'prev' : 'next')
    }
    //delete method to delete anything
    async delete(noteId){
     let store  = await this.accessStore('readwrite')
     return store.delete(noteId)
    }
    //update method to update specific note 
    async update(note){
     let store = await this.accessStore('readwrite')
     return store.put(note)
    }
    //clear to clear everythin
    async clear(){
let notes = await this.accessStore('readwrite')
return notes.clear();
    }

}