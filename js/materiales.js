// materiales.js — datos de cada SEMANA.

const MATERIALES_BASE = {
  1: [
    {
      titulo: 'Semana 1',
      subtitulo: 'Introducción a las bases de datos',
      descripcion: 'Conceptos básicos: qué es una base de datos, qué es un SGBD y por qué son importantes.',
      temas: ['Definición de BD', 'Sistemas Gestores de BD (SGBD)', 'Ventajas y funciones'],
      actividades: [
        {
          nombre: 'Actividad 1',
          archivos: [
            { nombre: 'Arquitectura Centralizada',        ruta: 'assets/pdfs/arquitectura_centralizada.pdf' },
            { nombre: 'Arquitectura Cliente',             ruta: 'assets/pdfs/arquitectura_cliente.pdf' },
            { nombre: 'Arquitectura Distribuida',         ruta: 'assets/pdfs/arquitectura_distribuida.pdf' },
            { nombre: 'Arquitectura Nube Multitenencia',  ruta: 'assets/pdfs/arquitectura_nube_multitenencia.pdf' }
          ]
        },
        {
          nombre: 'Actividad 2',
          archivos: [
            { nombre: 'Arquitecturas BD',              ruta: 'assets/pdfs/arquitecturas_bd.pdf' },
            { nombre: 'Características BD',            ruta: 'assets/pdfs/caracteristicas_bd.pdf' },
            { nombre: 'Características DBMS',          ruta: 'assets/pdfs/caracteristicas_dbms.pdf' },
            { nombre: 'Desarrollo Tecnología BD',      ruta: 'assets/pdfs/desarrollo_tecnologia_bd_mercado.pdf' },
            { nombre: 'Impactos Organizacionales BD',  ruta: 'assets/pdfs/impactos_organizacionales_bd.pdf' }
          ]
        }
      ]
    },
    {
      titulo: 'Semana 2',
      subtitulo: 'Tipos y arquitecturas de BD',
      descripcion: 'Clasificación de los SGBD y los distintos modelos de arquitectura.',
      temas: ['Tipos de SGBD', 'Arquitectura centralizada', 'Cliente-Servidor', 'Distribuida', 'Nube'],
      actividades: [
        {
          nombre: 'Actividad 1',
          archivos: [
            { nombre: 'Manual SQL Server', ruta: 'assets/pdfs/manual-sql-server.pdf' }
          ]
        },
        {
          nombre: 'Actividad 2',
          archivos: [
            { nombre: 'Cap 1: Disposiciones Generales', ruta: 'assets/html/cap1_disposiciones_generales.html' },
            { nombre: 'Cap 2: Condición de Egresado',   ruta: 'assets/html/cap2_condicion_de_egresado.html' },
            { nombre: 'Cap 3: Grado de Bachiller',      ruta: 'assets/html/cap3_grado_de_bachiller.html' },
            { nombre: 'Cap 4: Título Profesional',      ruta: 'assets/html/cap4_titulo_profesional.html' },
            { nombre: 'Cap 5: Plan y Desarrollo Tesis', ruta: 'assets/html/cap5_plan_y_desarrollo_de_tesis.html' },
            { nombre: 'Cap 6: Trabajo Suficiencia',     ruta: 'assets/html/cap6_trabajo_suficiencia_profesional.html' },
            { nombre: 'Cap 7: Del Asesor',              ruta: 'assets/html/cap7_del_asesor.html' }
          ]
        },
        {
          nombre: 'Actividad 3',
          archivos: [
            { nombre: 'Motor: MongoDB',         ruta: 'assets/pdfs/mongo-db.pdf' },
            { nombre: 'Motor: MySQL',           ruta: 'assets/pdfs/my-sql.pdf' },
            { nombre: 'Motor: Oracle Database', ruta: 'assets/pdfs/oracle-data-base.pdf' },
            { nombre: 'Motor: PostgreSQL',      ruta: 'assets/pdfs/postgre-sql.pdf' },
            { nombre: 'Motor: SQL Server',      ruta: 'assets/pdfs/sql-server.pdf' }
          ]
        }
      ]
    },
    {
      titulo: 'Semana 3',
      subtitulo: 'Características, impacto y motores de BD',
      descripcion: 'Características de las BD y los DBMS, impacto organizacional y motores del mercado.',
      temas: ['Características de BD', 'Impacto organizacional', 'Motores'],
      actividades: [
        {
          nombre: 'Actividad 1',
          archivos: [
            { nombre: 'Arquitectura de Base de Datos', ruta: 'assets/pdfs/arquitectura-de-base-de-datos.pdf' },
            { nombre: 'Funciones Principales de SGBD', ruta: 'assets/pdfs/funciones-principales-de-sgbd.pdf' },
            { nombre: 'Introducción a los SGBD',       ruta: 'assets/pdfs/introduccion-a-los-sgbd.pdf' },
            { nombre: 'Tipos de SGBD',                 ruta: 'assets/pdfs/tipos-de-sgbd.pdf' },
            { nombre: 'Ventajas de SGBD',              ruta: 'assets/pdfs/ventajas-de-sgbd.pdf' },
            { nombre: 'Referencias',                   ruta: 'assets/pdfs/referencias.pdf' }
          ]
        },
        {
          nombre: 'Actividad 2',
          archivos: [
            { nombre: 'Ejercicio: Cadena Editorial', ruta: 'assets/sql/cadenaeditorial.sql' },
            { nombre: 'Ejercicio: Empresa Material', ruta: 'assets/sql/empresamaterialinformatico.sql' },
            { nombre: 'Ejercicio: Grados y Títulos', ruta: 'assets/sql/gradostitulos_corregido.sql' }
          ]
        }
      ]
    },
    {
      titulo: 'Semana 4',
      subtitulo: 'Manual práctico y proyecto',
      descripcion: 'Manual de SQL Server, ejercicios prácticos SQL y capítulos del proyecto/tesis.',
      temas: ['Manual de SQL Server', 'Ejercicios SQL', 'Capítulos del proyecto'],
      actividades: [
        {
          nombre: 'Actividad 1',
          archivos: [
            { nombre: 'Cadena Editorial (SQL)', ruta: 'assets/sql/cadena_editorial.sql' }
          ]
        },
        {
          nombre: 'Actividad 2',
          archivos: [
            { nombre: 'Cadena Editorial - Preguntas', ruta: 'assets/pdfs/cadena_editorial_preguntas.pdf' }
          ]
        },
        {
          nombre: 'Actividad 3',
          archivos: [
            { nombre: 'Pregunta 1',  ruta: 'assets/img/pregunta_1.png' },
            { nombre: 'Pregunta 2',  ruta: 'assets/img/pregunta_2.png' },
            { nombre: 'Pregunta 3',  ruta: 'assets/img/pregunta_3.png' },
            { nombre: 'Pregunta 4',  ruta: 'assets/img/pregunta_4.png' },
            { nombre: 'Pregunta 5',  ruta: 'assets/img/pregunta_5.png' },
            { nombre: 'Pregunta 6',  ruta: 'assets/img/pregunta_6.png' },
            { nombre: 'Pregunta 7',  ruta: 'assets/img/pregunta_7.png' },
            { nombre: 'Pregunta 8',  ruta: 'assets/img/pregunta_8.png' },
            { nombre: 'Pregunta 9',  ruta: 'assets/img/pregunta_9.png' },
            { nombre: 'Pregunta 10', ruta: 'assets/img/pregunta_10.png' },
            { nombre: 'Pregunta 11', ruta: 'assets/img/pregunta_11.png' },
            { nombre: 'Pregunta 12', ruta: 'assets/img/pregunta_12.png' },
            { nombre: 'Pregunta 13', ruta: 'assets/img/pregunta_13.png' },
            { nombre: 'Pregunta 14', ruta: 'assets/img/pregunta_14.png' },
            { nombre: 'Pregunta 15', ruta: 'assets/img/pregunta_15.png' },
            { nombre: 'Pregunta 16', ruta: 'assets/img/pregunta_16.png' },
            { nombre: 'Pregunta 17', ruta: 'assets/img/pregunta_17.png' },
            { nombre: 'Pregunta 18', ruta: 'assets/img/pregunta_18.png' },
            { nombre: 'Pregunta 19', ruta: 'assets/img/pregunta_19.png' },
            { nombre: 'Pregunta 20', ruta: 'assets/img/pregunta_20.png' }
          ]
        }
      ]
    }
  ],
  2: [
    {
      titulo: 'Semana 5',
      subtitulo: 'Administración en Azure',
      descripcion: 'Gestión de bases de datos en la nube con Microsoft Azure.',
      temas: ['Creación de cuenta Azure', 'Azure SQL Database', 'Conexión SSMS'],
      actividades: [
        {
          nombre: 'Actividad 1',
          archivos: [
            { nombre: 'Manual: Creación de cuenta en Azure', ruta: 'assets/pdfs/manual_creacion_cuenta_azure.pdf' }
          ]
        },
        {
          nombre: 'Actividad 2',
          archivos: [
            { nombre: 'Manual: Creación de BD Grados y Títulos', ruta: 'assets/pdfs/manual_creacion_bd_grados_titulos.pdf' }
          ]
        },
        {
          nombre: 'Actividad 3',
          archivos: [
            { nombre: 'Código SQL: Grados y Títulos', ruta: 'assets/sql/codigo_grados_titulos.sql' },
            { nombre: 'Creación de Tablas en Azure', ruta: 'assets/pdfs/creacion_tablas_azure.pdf' }
          ]
        },
        {
          nombre: 'Actividad 4',
          archivos: [
            { nombre: 'Manual: Entrar a Azure desde SSMS', ruta: 'assets/pdfs/manual_entre_azure_ssms.pdf' }
          ]
        }
      ]
    },
    {
      titulo: 'Semana 6',
      subtitulo: 'Dependencias funcionales',
      descripcion: 'Introducción a las dependencias funcionales.',
      temas: ['Dependencia funcional', 'Dependencia parcial', 'Dependencia transitiva'],
      actividades: [{ nombre: 'Actividad 1', archivos: [{ nombre: 'Teoría Dependencias', ruta: 'assets/pdfs/u2-s1-teoria.pdf' }] }]
    },
    {
      titulo: 'Semana 7',
      subtitulo: 'Primera Forma Normal (1FN)',
      descripcion: 'Eliminar valores multivaluados y repetidos.',
      temas: ['Atributos atómicos', 'Grupos repetitivos', 'Ejercicios de 1FN'],
      actividades: [{ nombre: 'Actividad 1', archivos: [{ nombre: 'Teoría 1FN', ruta: 'assets/pdfs/u2-s2-teoria.pdf' }] }]
    },
    {
      titulo: 'Semana 8',
      subtitulo: 'Tercera Forma Normal (3FN)',
      descripcion: 'Eliminar dependencias transitivas.',
      temas: ['Dependencia transitiva', 'Casos prácticos'],
      actividades: [{ nombre: 'Actividad 1', archivos: [{ nombre: 'Teoría 3FN', ruta: 'assets/pdfs/u2-s4-teoria.pdf' }] }]
    }
  ],
  3: [
    {
      titulo: 'Semana 9',
      subtitulo: 'Subconsultas',
      descripcion: 'Consultas anidadas.',
      temas: ['Subconsultas'],
      actividades: [{ nombre: 'Actividad 1', archivos: [{ nombre: 'Teoría', ruta: 'assets/pdfs/u3-s1-teoria.pdf' }] }]
    },
    {
      titulo: 'Semana 10',
      subtitulo: 'JOIN avanzados',
      descripcion: 'Múltiples tablas.',
      temas: ['JOIN'],
      actividades: [{ nombre: 'Actividad 1', archivos: [{ nombre: 'Teoría', ruta: 'assets/pdfs/u3-s2-teoria.pdf' }] }]
    },
    {
      titulo: 'Semana 11',
      subtitulo: 'Funciones agregadas',
      descripcion: 'COUNT, SUM.',
      temas: ['Agregadas'],
      actividades: [{ nombre: 'Actividad 1', archivos: [{ nombre: 'Teoría', ruta: 'assets/pdfs/u3-s3-teoria.pdf' }] }]
    },
    {
      titulo: 'Semana 12',
      subtitulo: 'Vistas e índices',
      descripcion: 'Optimización.',
      temas: ['Vistas'],
      actividades: [{ nombre: 'Actividad 1', archivos: [{ nombre: 'Teoría', ruta: 'assets/pdfs/u3-s4-teoria.pdf' }] }]
    }
  ],
  4: [
    {
      titulo: 'Semana 13',
      subtitulo: 'Propiedades ACID',
      descripcion: 'Atomicidad.',
      temas: ['ACID'],
      actividades: [{ nombre: 'Actividad 1', archivos: [{ nombre: 'Teoría', ruta: 'assets/pdfs/u4-s1-teoria.pdf' }] }]
    },
    {
      titulo: 'Semana 14',
      subtitulo: 'Control de concurrencia',
      descripcion: 'Bloqueos.',
      temas: ['Concurrencia'],
      actividades: [{ nombre: 'Actividad 1', archivos: [{ nombre: 'Teoría', ruta: 'assets/pdfs/u4-s2-teoria.pdf' }] }]
    },
    {
      titulo: 'Semana 15',
      subtitulo: 'Procedimientos',
      descripcion: 'Funciones.',
      temas: ['SP'],
      actividades: [{ nombre: 'Actividad 1', archivos: [{ nombre: 'Teoría', ruta: 'assets/pdfs/u4-s3-teoria.pdf' }] }]
    },
    {
      titulo: 'Semana 16',
      subtitulo: 'Triggers',
      descripcion: 'Automatización.',
      temas: ['Triggers'],
      actividades: [{ nombre: 'Actividad 1', archivos: [{ nombre: 'Teoría', ruta: 'assets/pdfs/u4-s4-teoria.pdf' }] }]
    }
  ]
};