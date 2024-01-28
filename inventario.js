// productos
let carrito = [
    { id: 1, nombre: 'Producto 1', precio: 19.99, cantidad: 0 },
    { id: 2, nombre: 'Producto 2', precio: 29.99, cantidad: 0 },
    // ... otros productos
  ];
  
  function mostrarCarrito() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = ''; // Limpiar contenido previo
  
    carrito.forEach(producto => {
      const productInfo = document.createElement('div');
      productInfo.innerHTML = `
        <p><strong>ID:</strong> ${producto.id} - <strong>${producto.nombre}</strong></p>
        <p>Precio: $${producto.precio} - Cantidad: ${producto.cantidad}</p>
        <button data-id="${producto.id}" class="change-name-btn">Cambiar Nombre</button>
        <button data-id="${producto.id}" class="change-price-btn">Cambiar Precio</button>
        <button data-id="${producto.id}" class="add-btn">Agregar</button>
        <button data-id="${producto.id}" class="remove-btn">Quitar</button>
        <hr>
      `;
      cartDiv.appendChild(productInfo);
    });
  
    const agregarProductoBtn = document.createElement('button');
    agregarProductoBtn.textContent = 'Agregar Producto';
    agregarProductoBtn.id = 'add-product-btn';
    cartDiv.appendChild(agregarProductoBtn);
  
    // Agregar escuchadores de eventos para los nuevos botones
    document.querySelectorAll('.change-name-btn').forEach(btn => {
      btn.addEventListener('click', () => cambiarNombre(parseInt(btn.dataset.id)));
    });
  
    document.querySelectorAll('.change-price-btn').forEach(btn => {
      btn.addEventListener('click', () => cambiarPrecio(parseInt(btn.dataset.id)));
    });
  
    document.querySelectorAll('.add-btn').forEach(btn => {
      btn.addEventListener('click', () => actualizarCantidad(parseInt(btn.dataset.id), 'add'));
    });
  
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => actualizarCantidad(parseInt(btn.dataset.id), 'remove'));
    });
  
    document.getElementById('add-product-btn').addEventListener('click', agregarNuevoProducto);
  }
  
  function cambiarNombre(id) {
    const producto = carrito.find(producto => producto.id === id);
  
    if (producto) {
      Swal.fire({
        title: 'Cambiar Nombre',
        input: 'text',
        inputValue: producto.nombre,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed && result.value.trim() !== '') {
          producto.nombre = result.value.trim();
          mostrarCarrito();
        }
      });
    } else {
      Swal.fire('Error', 'Producto no encontrado', 'error');
    }
  }
  
  function cambiarPrecio(id) {
    const producto = carrito.find(producto => producto.id === id);
  
    if (producto) {
      Swal.fire({
        title: 'Cambiar Precio',
        input: 'text',
        inputValue: producto.precio,
        inputPlaceholder: 'Ingrese el nuevo precio',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed && result.value.trim() !== '') {
          const nuevoPrecio = parseFloat(result.value.trim());
          if (!isNaN(nuevoPrecio)) {
            producto.precio = nuevoPrecio;
            mostrarCarrito();
          } else {
            Swal.fire('Error', 'Ingrese un precio válido', 'error');
          }
        }
      });
    } else {
      Swal.fire('Error', 'Producto no encontrado', 'error');
    }
  }
  
  function actualizarCantidad(id, action) {
    const producto = carrito.find(producto => producto.id === id);
  
    if (producto) {
      if (action === 'add') {
        producto.cantidad++;
      } else if (action === 'remove' && producto.cantidad > 0) {
        producto.cantidad--;
      }
      mostrarCarrito();
    } else {
      Swal.fire('Error', 'Producto no encontrado', 'error');
    }
  }
  
  function agregarNuevoProducto() {
    Swal.fire({
      title: 'Agregar Nuevo Producto',
      input: 'text',
      inputPlaceholder: 'Ingrese el precio para el nuevo producto',
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && result.value.trim() !== '') {
        const nuevoPrecio = parseFloat(result.value.trim());
        if (!isNaN(nuevoPrecio)) {
          const nuevoId = carrito.length + 1;
          const nuevoNombre = `Producto ${nuevoId}`;
          carrito.push({ id: nuevoId, nombre: nuevoNombre, precio: nuevoPrecio, cantidad: 0 });
          mostrarCarrito();
        } else {
          Swal.fire('Error', 'Ingrese un precio válido', 'error');
        }
      }
    });
  }
  
  window.onload = function () {
    mostrarCarrito();
  };
  