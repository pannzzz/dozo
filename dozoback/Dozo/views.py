from django.shortcuts import render, get_object_or_404, redirect # type: ignore
from django.contrib.auth import login, authenticate, logout as auth_logout # type: ignore
from django.contrib.auth.forms import AuthenticationForm # type: ignore
from django.db import IntegrityError # type: ignore
from .models import CustomUser, Producto, Categoria, Carrito, Venta, VentaProducto, Producto, Estado
from .forms import CustomUserCreationForm, CustomUserChangeForm, ProductoForm, CategoriaForm, CarritoForm, VentaForm
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model

# User Views
def registro(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST, request.FILES)
        if form.is_valid():
            # Verifica si las contraseñas coinciden
            if form.cleaned_data['password1'] == form.cleaned_data['password2']:
                try:
                    # Guarda el usuario usando el formulario
                    user = form.save()
                    # Inicia sesión automáticamente
                    login(request, user)
                    # Redirige a la vista deseada después del registro
                    return redirect('mostrar_user')
                except IntegrityError:
                    return render(request, 'registrouser.html', {
                        'form': form,
                        'error': "Error al crear el usuario. Por favor, inténtalo de nuevo."
                    })
            else:
                return render(request, 'registrouser.html', {
                    'form': form,
                    'error': "Las contraseñas no coinciden."
                })
        else:
            return render(request, 'registrouser.html', {
                'form': form,
                'error': "Hay errores en la información ingresada. Por favor, revisa los campos."
            })
    else:
        form = CustomUserCreationForm()
        mytitle = "Registro Nuevos Usuarios"
        return render(request, 'registrouser.html', {
            'title': mytitle,
            'form': form
        })

def mostrar_user(request):
    users = CustomUser.objects.all()
    return render(request, 'mostrar_user.html', {
        'users': users
    })

def editar_user(request, user_id):
    user = get_object_or_404(CustomUser, id=user_id)
    if request.method == 'POST':
        form = CustomUserChangeForm(request.POST, request.FILES, instance=user)
        if form.is_valid():
            form.save()
            return redirect('mostrar_user')
    else:
        form = CustomUserChangeForm(instance=user)
    return render(request, 'editar_user.html', {
        'form': form,
        'user': user
    })

def eliminar_user(request, user_id):
    user = get_object_or_404(CustomUser, id=user_id)
    if request.method == 'POST':
        user.delete()
        return redirect('mostrar_user')
    return render(request, 'eliminar_user.html', {
        'user': user
    })


@csrf_exempt
def loginzzz(request):
    if request.method == "POST":
        try:
            # Parsear los datos de la solicitud
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            User = get_user_model()
            try:
                # Buscar usuario por email
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return JsonResponse({'error': 'El usuario no existe'}, status=400)

            # Verificar contraseña
            if not user.check_password(password):
                return JsonResponse({'error': 'Contraseña incorrecta'}, status=400)

            # Iniciar sesión
            login(request, user)

            # Responder con detalles del usuario
            return JsonResponse({
                'message': 'Inicio de sesión exitoso',
                'user': {
                    'username': user.username,
                    'email': user.email,
                    # Incluye otros campos si es necesario, como nombre completo, roles, etc.
                }
            }, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Datos inválidos'}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


def logout(request):
    auth_logout(request)
    return redirect('login')



# Producto Views
# Mostrar productos
def mostrar_producto(request):
    productos = Producto.objects.all()
    return render(request, 'productos/producto_list.html', {
        'productos': productos
    })

# Crear un producto
def crear_producto(request):
    if request.method == 'POST':
        form = ProductoForm(request.POST, request.FILES)
        if form.is_valid():
            try:
                form.save()
                return redirect('mostrar_producto')
            except Exception as e:
                return render(request, 'productos/producto_create.html', {
                    'form': form,
                    'error': f"Error al crear el producto: {str(e)}"
                })
        else:
            return render(request, 'productos/producto_create.html', {
                'form': form,
                'error': "Hay errores en la información ingresada. Por favor, revisa los campos."
            })
    else:
        form = ProductoForm()
        return render(request, 'productos/producto_create.html', {
            'form': form
        })

# Editar un producto
def editar_producto(request, producto_id):
    producto = get_object_or_404(Producto, id=producto_id)
    if request.method == 'POST':
        form = ProductoForm(request.POST, request.FILES, instance=producto)
        if form.is_valid():
            try:
                form.save()
                return redirect('mostrar_producto')
            except Exception as e:
                return render(request, 'productos/producto_edit.html', {
                    'form': form,
                    'producto': producto,
                    'error': f"Error al actualizar el producto: {str(e)}"
                })
        else:
            return render(request, 'productos/producto_edit.html', {
                'form': form,
                'producto': producto,
                'error': "Hay errores en la información ingresada. Por favor, revisa los campos."
            })
    else:
        form = ProductoForm(instance=producto)
        return render(request, 'productos/producto_edit.html', {
            'form': form,
            'producto': producto
        })

# Eliminar un producto
def eliminar_producto(request, producto_id):
    producto = get_object_or_404(Producto, id=producto_id)
    if request.method == 'POST':
        try:
            producto.delete()
            return redirect('mostrar_producto')
        except Exception as e:
            return render(request, 'productos/producto_delete.html', {
                'producto': producto,
                'error': f"Error al eliminar el producto: {str(e)}"
            })
    return render(request, 'productos/producto_delete.html', {
        'producto': producto
    })


# Categoria Views
# Mostrar categorías
def mostrar_categoria(request):
    categorias = Categoria.objects.all()
    return render(request, 'categorias/categoria_list.html', {
        'categorias': categorias
    })

# Crear una nueva categoría
def crear_categoria(request):
    if request.method == 'POST':
        form = CategoriaForm(request.POST)
        if form.is_valid():
            try:
                form.save()
                return redirect('mostrar_categoria')
            except Exception as e:
                return render(request, 'categorias/categoria_create.html', {
                    'form': form,
                    'error': f"Error al crear la categoría: {str(e)}"
                })
        else:
            return render(request, 'categorias/categoria_create.html', {
                'form': form,
                'error': "Hay errores en la información ingresada. Por favor, revisa los campos."
            })
    else:
        form = CategoriaForm()
        return render(request, 'categorias/categoria_create.html', {
            'form': form
        })

# Editar una categoría
def editar_categoria(request, categoria_id):
    categoria = get_object_or_404(Categoria, id=categoria_id)
    if request.method == 'POST':
        form = CategoriaForm(request.POST, instance=categoria)
        if form.is_valid():
            try:
                form.save()
                return redirect('mostrar_categoria')
            except Exception as e:
                return render(request, 'categorias/categoria_edit.html', {
                    'form': form,
                    'categoria': categoria,
                    'error': f"Error al actualizar la categoría: {str(e)}"
                })
        else:
            return render(request, 'categorias/categoria_edit.html', {
                'form': form,
                'categoria': categoria,
                'error': "Hay errores en la información ingresada. Por favor, revisa los campos."
            })
    else:
        form = CategoriaForm(instance=categoria)
        return render(request, 'categorias/categoria_edit.html', {
            'form': form,
            'categoria': categoria
        })

# Eliminar una categoría
def eliminar_categoria(request, categoria_id):
    categoria = get_object_or_404(Categoria, id=categoria_id)
    if request.method == 'POST':
        try:
            categoria.delete()
            return redirect('mostrar_categoria')
        except Exception as e:
            return render(request, 'categorias/categoria_delete.html', {
                'categoria': categoria,
                'error': f"Error al eliminar la categoría: {str(e)}"
            })
    return render(request, 'categorias/categoria_delete.html', {
        'categoria': categoria
    })

# Carrito Viewsfrom 

# Crear un carrito
def crear_carrito(request):
    if request.method == 'POST':
        form = CarritoForm(request.POST)
        if form.is_valid():
            try:
                form.save()
                return redirect('mostrar_carrito')
            except Exception as e:
                return render(request, 'carritos/carrito_create.html', {
                    'form': form,
                    'error': f"Error al crear el carrito: {str(e)}"
                })
        else:
            return render(request, 'carritos/carrito_create.html', {
                'form': form,
                'error': "Hay errores en la información ingresada. Por favor, revisa los campos."
            })
    else:
        form = CarritoForm()
        return render(request, 'carritos/carrito_create.html', {
            'form': form
        })



# Venta Viewsfrom

# Mostrar ventas
def mostrar_venta(request):
    ventas = Venta.objects.all()
    return render(request, 'ventas/venta_list.html', {
        'ventas': ventas
    })

# Crear una venta
@csrf_exempt
def crear_venta_api(request):
    if request.method == 'POST':
        try:
            # Parsear el cuerpo de la solicitud como JSON
            data = json.loads(request.body)
            print("Datos recibidos:", data)  # Para depuración

            # Validar la estructura del payload
            if not data.get('user') or not data.get('cart'):
                return JsonResponse({'error': 'El payload debe contener "user" y "cart".'}, status=400)

            user_data = data['user']
            cart = data['cart']

            # Validar y obtener el usuario
            try:
                usuario = CustomUser.objects.get(email=user_data.get('email'))
            except CustomUser.DoesNotExist:
                return JsonResponse({'error': 'Usuario no encontrado.'}, status=404)

            # Crear la venta
            estado, created = Estado.objects.get_or_create(nombre="Pendiente")
            total = sum(float(item['precio']) * item['cantidad'] for item in cart)  # Convertir a float
            venta = Venta.objects.create(
                usuario=usuario,
                total=total,
                estado=estado
            )

            # Asociar productos con la venta
            for item in cart:
                try:
                    producto = Producto.objects.get(id=item['id'])
                    VentaProducto.objects.create(
                        venta=venta,
                        producto=producto,
                        precio_unidad=float(producto.precio),  # Convertir precio a float
                        cantidad=item['cantidad']
                    )
                except Producto.DoesNotExist:
                    return JsonResponse({'error': f'Producto con ID {item["id"]} no encontrado.'}, status=404)

            return JsonResponse({'message': 'Venta creada exitosamente.', 'venta_id': venta.id}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Error al parsear JSON.'}, status=400)
        except Exception as e:
            print("Error interno:", str(e))  # Para depuración en consola
            return JsonResponse({'error': f'Error interno: {str(e)}'}, status=500)

    # Retornar error si el método no es POST
    return JsonResponse({'error': 'Método no permitido.'}, status=405)


# Editar una venta
def editar_venta(request, venta_id):
    venta = get_object_or_404(Venta, id=venta_id)
    if request.method == 'POST':
        form = VentaForm(request.POST, instance=venta)
        if form.is_valid():
            try:
                form.save()
                return redirect('mostrar_venta')
            except Exception as e:
                return render(request, 'ventas/venta_edit.html', {
                    'form': form,
                    'venta': venta,
                    'error': f"Error al actualizar la venta: {str(e)}"
                })
        else:
            return render(request, 'ventas/venta_edit.html', {
                'form': form,
                'venta': venta,
                'error': "Hay errores en la información ingresada. Por favor, revisa los campos."
            })
    else:
        form = VentaForm(instance=venta)
        return render(request, 'ventas/venta_edit.html', {
            'form': form,
            'venta': venta
        })

# Eliminar una venta
def eliminar_venta(request, venta_id):
    venta = get_object_or_404(Venta, id=venta_id)
    if request.method == 'POST':
        try:
            venta.delete()
            return redirect('mostrar_venta')
        except Exception as e:
            return render(request, 'ventas/venta_delete.html', {
                'venta': venta,
                'error': f"Error al eliminar la venta: {str(e)}"
            })
    return render(request, 'ventas/venta_delete.html', {
        'venta': venta
    })



from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Producto
from .serializers import ProductoSerializer

class ProductoListAPIView(APIView):
    def get(self, request, *args, **kwargs):
        productos = Producto.objects.filter(estado=True)  # Solo productos activos
        serializer = ProductoSerializer(productos, many=True)
        return Response(serializer.data)
    
    
    
from rest_framework.generics import RetrieveAPIView
from .models import Producto
from .serializers import ProductoSerializer

class ProductoDetailAPIView(RetrieveAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    


# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Cart, Producto
from .serializers import CartSerializer, CartItemSerializer

class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def post(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        product = Producto.objects.get(id=request.data['product_id'])
        item, item_created = cart.items.get_or_create(product=product)
        if not item_created:
            item.quantity += request.data.get('quantity', 1)
        else:
            item.quantity = request.data.get('quantity', 1)
        item.save()
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def delete(self, request, item_id):
        cart = Cart.objects.get(user=request.user)
        item = cart.items.get(id=item_id)
        item.delete()
        serializer = CartSerializer(cart)
        return Response(serializer.data)


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from .models import Venta, VentaProducto
from django.core.serializers import serialize

@login_required
def listar_pedidos_usuario(request):
    try:
        usuario = request.user  # Obtener el usuario autenticado
        ventas = Venta.objects.filter(usuario=usuario).select_related('estado')

        pedidos = [
            {
                "id": venta.id,
                "fecha_venta": venta.fecha_venta.strftime('%Y-%m-%d %H:%M:%S'),
                "estado": venta.estado.nombre,
                "total": float(venta.total),
                "productos": [
                    {
                        "titulo": vp.producto.titulo,
                        "cantidad": vp.cantidad,
                        "precio": float(vp.precio_unidad),
                    }
                    for vp in venta.productos.all()
                ]
            }
            for venta in ventas
        ]

        return JsonResponse({"pedidos": pedidos}, status=200)
    except Exception as e:
        return JsonResponse({"error": f"Error al obtener pedidos: {str(e)}"}, status=500)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
from .serializers import CustomUserSerializer

class RegisterUserView(APIView):
    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Usuario registrado exitosamente"}, status=status.HTTP_201_CREATED)

        print("Errores del serializer:", serializer.errors)  # Imprime errores en consola
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)



from django.http import JsonResponse
from .models import Producto

def filter_products(request):
    # Obtener los filtros desde los parámetros GET
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')
    category_id = request.GET.get('category_id')

    # Depuración: Imprimir los filtros recibidos
    print(f"Min price: {min_price}, Max price: {max_price}, Category id: {category_id}")

    # Convierte los precios a enteros si se proporcionan
    try:
        if min_price:
            min_price = int(min_price)
        if max_price:
            max_price = int(max_price)
    except ValueError:
        return JsonResponse({"error": "Invalid price values"}, status=400)

    # Filtra los productos
    products = Producto.objects.all()

    if min_price is not None:
        print(f"Filtrando por precio mínimo: {min_price}")
        products = products.filter(precio__gte=min_price)
    if max_price is not None:
        print(f"Filtrando por precio máximo: {max_price}")
        products = products.filter(precio__lte=max_price)
    if category_id:
        print(f"Filtrando por categoría: {category_id}")
        products = products.filter(categoria_id=category_id)

    # Serializa los productos
    products_data = [
        {
            "id": p.id,
            "titulo": p.titulo,
            "precio": p.precio,
            "categoria": {"id": p.categoria.id, "nombre": p.categoria.nombre} if p.categoria else None,
            "descripcion": p.descripcion,
            "imagen": p.imagen.url if p.imagen else None,  # Asegúrate de que `imagen` esté disponible
        }
        for p in products
    ]
    
    # Depuración: Verificar los productos filtrados
    print(f"Productos filtrados: {products_data}")

    return JsonResponse(products_data, safe=False)



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Venta
from .serializers import VentaSerializer

class PedidoDetailView(APIView):
    def get(self, request, id):
        try:
            venta = Venta.objects.get(id=id)
            serializer = VentaSerializer(venta)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Venta.DoesNotExist:
            return Response({'error': 'Pedido no encontrado'}, status=status.HTTP_404_NOT_FOUND)


class VentaAPIView(APIView):
    def post(self, request):
        try:
            # Procesa la solicitud
            data = request.data
            venta = Venta.objects.create(**data)
            return Response({"message": "Venta creada correctamente"}, status=201)
        except Exception as e:
            # Log para depurar
            print(f"Error: {e}")
            return Response({"error": "Error interno del servidor"}, status=500)


from django.shortcuts import render
from django.db.models import Sum, F, Min, Max
from .models import Venta, VentaProducto, Producto

def ventas_view(request):
    # Recuperar todas las ventas con sus productos
    ventas = Venta.objects.select_related('usuario', 'estado').prefetch_related('productos')

    # Obtener datos para el gráfico de productos más vendidos
    productos_mas_vendidos = (
        VentaProducto.objects
        .values('producto__titulo')
        .annotate(total_vendido=Sum(F('cantidad')))
        .order_by('-total_vendido')[:10]  # Los 10 productos más vendidos
    )

    # Producto más vendido
    producto_mas_vendido = (
        VentaProducto.objects
        .values('producto__titulo')
        .annotate(total_vendido=Sum(F('cantidad')))
        .order_by('-total_vendido')
        .first()
    )

    # Producto menos vendido
    producto_menos_vendido = (
        VentaProducto.objects
        .values('producto__titulo')
        .annotate(total_vendido=Sum(F('cantidad')))
        .order_by('total_vendido')
        .first()
    )

    # Producto más costoso
    producto_mas_costoso = Producto.objects.order_by('-precio').first()

    # Producto más barato
    producto_mas_barato = Producto.objects.order_by('precio').first()

    # Calcular el subtotal de todas las ventas
    subtotal = ventas.aggregate(total=Sum('total'))['total'] or 0

    # Calcular las ganancias por fecha
    ganancias = (
        Venta.objects
        .values('fecha_venta__date')  # Agrupar por fecha
        .annotate(total_ganancias=Sum('total'))
        .order_by('fecha_venta__date')
    )

    # Contexto para pasar a la plantilla
    context = {
        'ventas': ventas,
        'productos_mas_vendidos': productos_mas_vendidos,
        'producto_mas_vendido': producto_mas_vendido,
        'producto_menos_vendido': producto_menos_vendido,
        'producto_mas_costoso': producto_mas_costoso,
        'producto_mas_barato': producto_mas_barato,
        'subtotal': subtotal,
        'ganancias': ganancias,
    }
    return render(request, 'ventas.html', context)


