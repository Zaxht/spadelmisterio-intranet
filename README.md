# Intranet Spa del Misterio

Sistema interno para administrar clientes, mascotas, citas y servicios del negocio Spa del Misterio.

## Como ejecutar

```bash
npm install
npm run dev
```

Luego abrir la URL que muestra Vite, normalmente `http://localhost:5173/`.

## Acceso demo

- Correo: `admin@spadelmisterio.cl`
- Contrasena: `spadelmisterio`

La sesion se guarda en `localStorage`, por eso se mantiene aunque se recargue la pagina.

## Modulos

- `Login`: valida credenciales simuladas y crea una sesion local.
- `Dashboard`: resume clientes, citas y servicios activos.
- `Clientes`: CRUD completo con busqueda, edicion, eliminacion y detalle dinamico.
- `Agenda`: CRUD completo de citas conectado a clientes y servicios.
- `Servicios`: administra catalogo, precios, duracion y estado activo/pausado.

## Estructura de archivos

```text
src/
  App.tsx                  Rutas principales de la aplicacion.
  main.tsx                 Punto de entrada de React.
  types.ts                 Interfaces y tipos TypeScript.
  components/              Componentes compartidos de layout y rutas protegidas.
  context/                 Contexto global de autenticacion.
  hooks/                   Hooks propios, como useAuth.
  data/                    Datos demo iniciales.
  pages/                   Pantallas principales de la intranet.
  utils/                   Funciones reutilizables para localStorage.
```

## Requisitos cubiertos

- React con TypeScript.
- Rutas protegidas y rutas dinamicas con `useParams`.
- Login simulado.
- Sesion global con `useContext`.
- Persistencia en `localStorage`.
- Formularios controlados con `useState`.
- Carga de datos con `useEffect`.
- Dos CRUD principales: clientes y citas.
- Busqueda/filtro, editar y eliminar con confirmacion visual.

## Comandos utiles

```bash
npm run lint
npm run build
```
