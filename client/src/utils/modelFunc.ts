export const showHideModel = (id: string, show: boolean) => {
  const doc: any = document.getElementById(id);
  if (show) {
    doc.showModal()
  } else {
    doc.close()
  }
}