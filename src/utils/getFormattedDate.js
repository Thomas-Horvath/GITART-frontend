
const getFormattedDate = (date) => {
    return date.toISOString().split('T')[0]; // Csak a dátum rész, pl. 2024-09-28
  };


  export default  getFormattedDate;