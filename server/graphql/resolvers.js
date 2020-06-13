const notes = []

module.exports = {
  Query: {
    notes: () => notes
  },
  Mutation: {
    addNote: (_, args) => {
      const note = {
        content: args.content,
        id: Math.floor(Math.random() * 10000000)
      }

      notes.push(note)

      return note
    }
  }
}
