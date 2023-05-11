function validationView (data) {
    let userId = getDataFromLocaleStorage()
    if(userId && (userId._id == data._ownerId)) {
      return html `<a href="/edit/${data._id}" id="edit-btn">Edit</a>
             <a href="/delete/${data._id}" id="delete-btn">Delete</a>`
     } else if( userId && (userId._id != data._ownerId)) {
      return html ` <a href="" id="like-btn">Like</a>`
     }
   }
  
  
  
  
  function checkConditions(bookId, isOwner, hasLike) {
      if (ctx.userData !== null) {
          if (isOwner) {
              return ctx.html`
                  <a href="/edit/${bookId}" class="button">Edit</a>
                  <a href="/delete/${bookId}" class="button">Delete</a>
                  `;
          } else if (hasLike === false) {
              return ctx.html`
              <div id="action-buttons">
                  <a @click=${async (e) => {
                      e.preventDefault();
                      const [_, countLikes] = await Promise.all([
                      addLike(bookId),
                      getAllLikesForBookById(bookId),
                      ]);
                      document.getElementById('total-likes').textContent = `Likes: ${countLikes}`;
                      document.getElementById('like-btn').style.display = 'none';
                  }} id="like-btn" class="button" href="#">Like</a>
              </div>`;
          }
      }
      return '';
  }
  
  
  
 // ==================================
  
  async function makeDonation (item) {
      
      const [_,donations] = await Promise.all([
          postDonation(item._id),
          getDonationsForPost(item._id),
          ]);
          
          document.querySelector('.donate-Item').textContent = `Donate Materials: ${donations}`
          document.getElementById('donateBtn').style.display = 'none'
  
  }
  
  
 // =========================================
  
  
   function checkConditions (item,userId,isCreator,onDelete,isUserDonate){
      if(userId) {
          
          if(isCreator == true) {
              return html `<div class="btns">
              <a href=/edit/${item._id} class="edit-btn btn">Edit</a>
              <a @click = ${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>`
          } else if(isUserDonate == false) {
              return html `<a id="donateBtn" href= javascript:void(0) class="donate-btn btn"
               @click = ${makeDonation.bind(null,item)}>Donate</a>`
          }
      }
      return ''
  }
 // ================================================================
  
  
  
  
  export function showDetails(context) {
      ctx = context;
      const itemId = ctx.params.id;
      update();
  
      async function buyCurrentItem() {
          await buyItem(itemId);
          update();
      }
  
      async function update() {
          const itemDetails = await getItemById(itemId);
          const totalBought = await getAllBought(itemId);
          const isOwner = ctx.userData?._id === itemDetails._ownerId;
  
          let myBoughtCount = 0;
          const userId = ctx.userData?._id;
          if (userId) {
              myBoughtCount = await getMyBougth(itemId, userId);
          }
  
          ctx.render(detailsTemplate(itemDetails, myBoughtCount, totalBought, buyCurrentItem, isOwner));
      }
  }
  