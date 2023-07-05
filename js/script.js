/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
// Declare global variables
const NUMBERPERPAGE = 9;

// I moved these variables to the global environment as they are refrenced across multiple functions.
let listElement = document.querySelector('.student-list');
let linkList = document.querySelector('.link-list');
const page = document.getElementsByClassName('page')[0];

//add a div with the hidden inline style property which is removed or added depending on search results.
//I used a function to help keep the global variable environment cleaner.
// It's not best practice to do the other styling here, but the instructions discouraged us from messing about in the CSS file

const noSearchResults = document.createElement('h1');
noSearchResults.textContent = 'No Students Match Your Search';
noSearchResults.style.display = 'none';
noSearchResults.style.textAlign = 'center';
noSearchResults.style.fontWeight = 'bold';
page.insertBefore(noSearchResults,listElement);



//Searchbar creation function
//I'm using a funciton here to avoid cluttering up the global variable environment

function createSearchbar(list=data){
   let searchbar = document.createElement('label');
   searchbar.for='search';
   searchbar.className='student-search';
   searchbar.innerHTML=`
      <span>Search by name</span>
      <input id='search' placeholder='Search by name...'>
      <button type='button'><img src='img/icn-search.svg' alt='Search icon'></button>
   `;
   document.getElementsByTagName('header')[0].appendChild(searchbar);

// Use an event listener to listen for updates to the search bar.

   searchbar.addEventListener('keyup',(e)=>{
      let inputValue = searchbar.getElementsByTagName('INPUT')[0].value;
      // use a for loop to create a new list only matching the search function
      // use the .toLowerCase() method to ensure the matching isn't case sensitive.
      // regex would probably be easier but I know we're not taught that until the next module

      let newList = [];
      for (let el of list){
         let name = el.name.first.toLowerCase() + ' ' + el.name.last.toLowerCase();
         if (name.includes(inputValue.toLowerCase())){
            newList.push(el);
         }
      // Use an if statement to determine if there are any matching results, if not display message and clear previously rendered entries

      }
      if (newList.length){
         noSearchResults.style.display = 'none';
         showPage(newList);
         addPagination(newList);
      } else {
         noSearchResults.style.display = '';
         listElement.innerHTML = '';
         linkList.innerHTML = '';

      }

   })
}

//Ad

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// Create the display student function, which is called in showPage

function displayStudent (list,index){
   let newLi = document.createElement('li');
   newLi.className = 'student-item cf';
   newLi.innerHTML = `<div class='student-details'>
         <img class='avatar' src='${list[index].picture.large}' alt='Profile Picture'>
         <h3>${list[index].name.first} ${list[index].name.last}</h3>
         <span class='email'>${list[index].email}</span>
      </div>
      <div class='joined-details'>
         <span class='date'>${list[index].registered.date}</span>
      </div>
   `;
   return newLi;
}

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage (list=data, page=1) {
   //initialize local function variables
   const startIndex = (page*NUMBERPERPAGE)-NUMBERPERPAGE;
   let endIndex = (page*NUMBERPERPAGE);
   //setting up logic to set endIndex to either page*numberPerPage OR list.length, whichever is lower.
      if(page*NUMBERPERPAGE>list.length){
         endIndex = list.length;
      }
   //reset list to empty
   listElement.innerHTML = '';
   
   // Iterate through the data based on start index and end index.
   // Doing it this way instead of the additional if improves speed
   for (let i = startIndex; i<endIndex; i++){
      listElement.appendChild(displayStudent(list,i));
   }

}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list=data){
   const numButtons = Math.ceil(list.length/NUMBERPERPAGE);

   //clear previously displayed linkLists
   linkList.innerHTML='';

   //iterate numButtons times creating buttons and appending them to linkList
   for (let i = 1; i <= numButtons; i++){
      let newLi = document.createElement('li');
      newLi.innerHTML=`<button type='button'>${i}</button>`
      linkList.appendChild(newLi);
   }

   //Select first button and set its class to active
   linkList.firstElementChild.firstElementChild.className='active';

   //Create an event listener to change active class to selected page button.
   linkList.addEventListener('click', (e)=> {
      
      // Ensure that the click is on a button
      if (e.target.tagName === 'BUTTON'){
         //use a for loop to iterate over the buttons and remove any classes.
         for (let i = 0; i < linkList.children.length; i++){
            linkList.children[i].firstChild.className='';
         }

         //add the active class name to the button that was clicked.
         e.target.className = 'active';

         //call the showPage function to update the display
         showPage(list,e.target.textContent);
      }
   })
}

// Call functions


createSearchbar();
showPage();
addPagination();