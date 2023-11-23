



export function hideAllSection(section){
    const allSeblings = $(section).siblings();
    for (let i = 0; i < allSeblings.length; i++) {
      allSeblings[i].classList.replace("d-block","d-none")

      
    }
}

