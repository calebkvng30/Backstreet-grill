// ---- tabs ----
  const tabs = document.querySelectorAll('.tab');
  const cats = document.querySelectorAll('.menu-category');
  tabs.forEach(tab=>{
    tab.addEventListener('click',()=>{
      tabs.forEach(t=>t.classList.remove('active'));
      cats.forEach(c=>c.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector('.menu-category[data-cat="'+tab.dataset.cat+'"]').classList.add('active');
    });
  });

  // ---- build item rows from ITEM: shorthand ----
  document.querySelectorAll('.item-list').forEach(list=>{
    const raw = list.innerHTML;
    const lines = raw.split('ITEM:').map(s=>s.trim()).filter(Boolean);
    if(lines.length === 0 || !raw.includes('ITEM:')) return;
    list.innerHTML = '';
    lines.forEach(line=>{
      const parts = line.split(':');
      // parts: name, desc, price, id  (desc may be empty)
      if(parts.length < 4) return;
      const id = parts.pop().trim();
      const price = parseFloat(parts.pop().trim());
      const desc = parts.pop().trim();
      const name = parts.join(':').trim();
      const div = document.createElement('div');
      div.className = 'item';
      const priceLabel = price > 0 ? 'R '+price.toFixed(0) : 'Ask server';
      const addBtn = price > 0 ? '<button class="add-btn" data-id="'+id+'" data-name="'+name.replace(/"/g,'&quot;')+'" data-price="'+price+'">+</button>' : '';
      div.innerHTML = '<div class="item-info"><div class="item-name">'+name+'</div>'+(desc?'<div class="item-desc">'+desc+'</div>':'')+'</div><div class="item-right"><span class="item-price">'+priceLabel+'</span>'+addBtn+'</div>';
      list.appendChild(div);
    });
  });

  // ---- cart logic ----
  let cart = {};
  function addToCart(id,name,price){
    if(!cart[id]) cart[id] = {name,price,qty:0};
    cart[id].qty++;
    renderCart();
  }
  function changeQty(id,delta){
    if(!cart[id]) return;
    cart[id].qty += delta;
    if(cart[id].qty <= 0) delete cart[id];
    renderCart();
  }
  function renderCart(){
    const itemsEl = document.getElementById('cartItems');
    const emptyEl = document.getElementById('cartEmpty');
    const ids = Object.keys(cart);
    const countEl = document.getElementById('cartCount');
    let totalQty = 0, total = 0;
    ids.forEach(id=>{totalQty += cart[id].qty; total += cart[id].qty * cart[id].price;});
    countEl.textContent = totalQty;
    countEl.style.display = totalQty > 0 ? 'flex' : 'none';
    document.getElementById('cartTotal').textContent = 'R '+total.toFixed(0);
    if(ids.length === 0){
      itemsEl.innerHTML = '';
      itemsEl.appendChild(emptyEl);
      emptyEl.style.display = 'block';
    } else {
      itemsEl.innerHTML = '';
      ids.forEach(id=>{
        const it = cart[id];
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = '<div><div class="ci-name">'+it.name+'</div><div class="ci-price">R '+it.price+' each</div></div><div class="ci-qty"><button class="qty-btn" onclick="changeQty(\''+id+'\',-1)">−</button><span class="mono">'+it.qty+'</span><button class="qty-btn" onclick="changeQty(\''+id+'\',1)">+</button></div>';
        itemsEl.appendChild(row);
      });
    }
    // build whatsapp message
    let msg = "Hi Backstreet Grill, I'd like to order:%0A";
    ids.forEach(id=>{
      const it = cart[id];
      msg += "• "+it.qty+"x "+it.name+" - R"+(it.qty*it.price).toFixed(0)+"%0A";
    });
    msg += "%0ATotal: R"+total.toFixed(0)+"%0A%0APlease confirm collection/delivery time.";
    document.getElementById('waCheckout').href = 'https://wa.me/27673276265?text='+msg;
  }
  document.addEventListener('click',e=>{
    if(e.target.classList.contains('add-btn')){
      addToCart(e.target.dataset.id, e.target.dataset.name, parseFloat(e.target.dataset.price));
      e.target.style.background = 'var(--ember)';
      e.target.style.color = 'var(--bone)';
      setTimeout(()=>{e.target.style.background='';e.target.style.color='';},250);
    }
  });

  function toggleCart(open){
    document.getElementById('cartDrawer').classList.toggle('open',open);
    document.getElementById('overlay').classList.toggle('open',open);
  }
