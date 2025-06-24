<h1 style="height: 60px; line-height: 60px; margin-left: 70px; font-weight: 500; border: none;">Trámites Panel</h1>

Plataforma para la automatización y digitalización de procesos de negocio.

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 14.2.11.

## Requisitos

Antes de comenzar a trabajar con este proyecto, asegúrate de tener lo siguiente instalado:

- **NodeJS** v10 o más reciente 
- Angular CLI versión 14 o superior

## Instalación

1. Clona el repositorio

```shell
git clone https://github.com/darcdev/tramites-panel.git
```

2. Navega a la carpeta del proyecto

```shell
cd tramites-panel
```
3. Instala las dependencias

```shell
npm install 
```
4. Inicia el servidor de desarrollo

```shell
ng serve
```
Aclaración : Si esta ejecutando el proyecto de tramites de usuario u otro proyecto en el puerto 4200. Debe cambiar el puerto compatible actualmente con el backend. el 4300. De la siguiente manera : 

```shell
ng serve --port 4300
```

## Servidor de desarrollo

Una vez que ejecutes `ng serve` se levanta un servidor de desarrollo. Navega a `http://localhost:4200/` o `http://localhost:4300/`. Esta aplicación se recargara automaticamente, si necesitas cambiar alguno de los archivos del codigo fuente.

## Automatizar creación de codigo

Para crear la base inicial de los componentes, se puede usar el comando:

```shell
ng generate component component-name
```
Para crear directivas, servicios, pipes, entre otros se puede usar el comando : 

```shell
ng generate directive|pipe|service|class|guard|interface|enum|module.
```

## Estructura del proyecto

Este proyecto sigue la estructura recomendada de Google para un proyecto Angular escalable, la cual se basa en los siguientes principios que deben aplicarse a cabalidad.

- Separar el código en módulos.
- Organizar los módulos según su propósito y complejidad.
- Separar los archivos según su función y responsabilidad.

La estructura del proyecto se compone de las siguientes carpetas:

- app/core: Esta carpeta contiene los módulos y servicios que son esenciales para el funcionamiento de la aplicación, como los servicios, guardianes, interceptores. Todo aquello que la aplicación necesita para funcionar adecuadamente.

- app/features: Esta carpeta contiene los módulos que representan las diferentes características de la aplicación, como la sección de listar procesos, obtener campos formulario dinamico. Cada caracteristica puede tener a su vez subcarpetas incluyendo, componentes, servicios modelos, directivas, pipes , utils, entre otros.

- app/shared: Esta carpeta contiene los módulos y componentes que se comparten entre diferentes características de la aplicación, como los componentes de navegación o los servicios comunes. Esta carpeta a su vez tendra los componentes compartidos, pipes, directivas, utils, modelos y servicios compartidos en varias partes de la aplicación.

Otras carpetas a tener en cuenta son : 

- assets: Esta carpeta contiene los archivos estáticos, como imágenes o archivos JSON, que se utilizan en la aplicación.

- environments: Esta carpeta contiene los archivos de configuración para diferentes entornos, como environment.prod.ts para producción y environment.dev.ts para desarrollo.


## Compilación a producción (Build)

Para construir los archivos necesarios para ejecutar la aplicación en modo producción se ejecuta el comando : 

```shell
ng build
```

El artefacto construido se guardará por defecto en la carpeta `dist/` en la raiz del proyecto.

## Dockerizar la aplicación para producción

El archivo Dockerfile que se encuentra en la raiz del proyecto, define dos etapas para la construcción de la imagen de Docker. En la primera etapa se compila la aplicación usando una imagen de Node.js y se genera una versión optimizada para producción. En la segunda etapa se crea una imagen de Nginx que sirve los archivos generados en la primera etapa.

Para dockerizar la aplicación debemos seguir los siguientes pasos : 

1. Abre una terminar y navega a la raiz del proyecto
2. Ejecute el siguiente comando para construir la imagen de Docker
```shell
docker build -t <nombre-de-imagen> .
```
Este comando construirá la imagen de Docker utilizando el archivo Dockerfile que acabas de crear. Reemplaza <nombre-de-imagen> con el nombre que quieres que tenga la imagen.
4. Finalmente debes ejecutar el siguiente comando para iniciar el contenedor con la imagen de docker creada : 
  
```shell
docker run -p 8881:80 <nombre-de-imagen> 
```
Este comando inicia el contenedor con la imagen de Docker que acabas de crear y redirige el tráfico desde el puerto 80 del host (por defecto) al puerto 8881 del contenedor (asginado en la imagen de docker). Si deseas otro puerto debes cambiar el puerto en el comando anterior.
  
 ```shell
docker run -p <otro-puerto>:80 <nombre-de-imagen> 
```

# Personalización

En esta sección aprenderás cómo personalizar Vex para que sea exactamente como deseas que sea.

## Configuration

Configurar el diseño de Vex según tus necesidades es tan fácil como establecer un objeto simple con los valores que deseas. Aquí tienes un ejemplo de configuración que lo maneja todo por ti:

Puedes cambiar estos valores incluso en tiempo de ejecución y la página se ajustará a los cambios.

```typescript
{
  id: 'vex-default',
  layout: 'horizontal',
  boxed: false,
  sidenav: {
    layout: 'expanded'
  },
  toolbar: {
    fixed: true
  },
  footer: {
    visible: true,
    fixed: true
  }
}
```

## Cambiando el estilo y las variables CSS

> La mayoría del estilo (padding, colores, fuentes, pesos de fuente, ...) está construido de manera modular y es fácilmente personalizable. Si deseas cambiar cualquier estilo específico globalmente, simplemente puedes cambiar la variable CSS dentro del archivo style.scss y se actualizará en cada sección de la página.

Aquí hay solo algunas variables de ejemplo, casi todo se hace a través de variables:

```typescript
--container-width: 1200px;
--padding: 24px;
--font: Roboto, "Helvetica Neue", sans-serif;
--font-weight-semi-bold: 500;
--text-color: #{$dark-primary-text};
--sidenav-width: 280px;
--sidenav-background: #{$sidenav-background};
--sidenav-color: white;
// and much more...
```

## Usando colores personalizados para las paletas primarias/secundarias/advertencias

> Dentro del archivo style.scss, encuentra la sección a continuación. Los valores detrás de los nombres son colores rgb, por lo que --color-primary sería rgb(92, 119, 255) (92, 119, 255) (sin el rgb()) si deseas personalizar estos colores, puedes hacerlo fácilmente cambiando los colores de estas variables.

Para cada color primario hay una variable de contraste. La variable de contraste se utiliza cuando deseas mostrar algo en el color primario.

Ejemplo: usas --color-primary como color de fondo (y el color es bastante oscuro) y deseas mostrar texto en ese fondo, entonces deseas que --color-primary-contrast sea blanco y usarlo como color de texto.

Esto funciona de la misma manera para todos los demás colores también.

```typescript
// Colors (style.scss)
--color-primary: 92, 119, 255;
--color-primary-contrast: 255, 255, 255;

--color-accent: 255, 64, 129;
--color-accent-contrast: 255, 255, 255;

--color-warn: 244, 67, 54;
--color-warn-contrast: 255, 255, 255;
```

