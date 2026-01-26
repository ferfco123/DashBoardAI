📊 Dashboard Inteligente de Ventas
🧠 Overview
Este proyecto es un Dashboard de Ventas orientado a análisis y visualización de datos, desarrollado como proyecto de portfolio para demostrar habilidades en React, Node.js y MongoDB, con foco en la interpretación de métricas y toma de decisiones basada en datos.

El dashboard consume datos desde una API REST y los transforma en KPIs claros y gráficos interactivos, simulando un entorno real de análisis comercial.

🎯 Objetivo del proyecto
Construir una aplicación full stack que permita:

Analizar el rendimiento de ventas en distintos períodos

Visualizar métricas clave de forma clara y profesional

Detectar tendencias y variaciones en los ingresos

Demostrar buenas prácticas de arquitectura y código

Este proyecto no incluye autenticación ni gestión de usuarios, ya que está enfocado exclusivamente en el análisis de datos, evitando solaparse con otros proyectos del portfolio.

✨ Features
KPIs principales: ingresos totales, promedio de ventas, variación porcentual

Gráficos de ventas por período (semana / mes)

Comparación entre períodos

Filtros por rango de fechas

Visualización clara y responsive

Generacion de Insights automaticos:los datos procesados se envian a Gemini(IA) para obtener analisis, concluciones y sugerencias en lenguaje natural.

Generacion automatica de datos: semanalmente se generan entre 50 y 100 ventas simuladas.

Snapshots automaticos:

Semanal (todos los lunes): snapshot semanal, insight semanal y AI insight.

Mensual: snapshot mensual, insight mensual, y AI insight.

🛠️ Tech Stack

FRONTEND

React

Hooks (useState, useEffect, useQuery, useLocation, useContext,useParams,useSearchParams)

Librerías de gráficos ( Recharts)

CSS

BACKEND

Node.js

Express.js

MongoDB

Mongoose

node-cron para tareas programadas

Integracion con Gemini AI para generacion de AI Insights

cors

axios

API REST

Integracion con Gemini API para generacion de insights

🗂️ Arquitectura
/client
/components
/pages
/context
/axios

/server
/models
/controllers
/routes
Arquitectura cliente-servidor con separación clara de responsabilidades.

📈 Data Model
El sistema maneja un modelo simple y realista de ventas:

Fecha de la venta

Monto

Tipo de operación

Los datos se almacenan en MongoDB y se consumen desde el frontend mediante endpoints REST.

BACKGROUND JOBS AND AUTOMATION

El sistema incluye tareas automatizadas en segundo plano que se ejecutan sin intervencion del usuario, orientadas al analisis periodico de datos.

Generacion automatica de ventas:

Frecuencia :Semanal.
Cantidad:entre 50 y 100 ventas simuladas.

Procesos semanal(todos los lunes):

Consolidacion de ventas de la semana.

Generacion de snapshots semanal.

Generacion de insight semanal.

Calculo de metricas clave.

Envio de insight semanal a gemini para generacion de AI insight semanal.

Persistencia del snapshot, insight y AIinsight en la base de datos.

Proceso mensual:

Consolidacion de ventas del mes.

Generacion del snapshot mensual.

Generacion de insght mensual con calculo de metricas mensuales.

Envio del insight a gemini para generacion del AI insight mensual.

Persistencia del snapshot insight y AI insight en la base de datos.

HOW AI IS USED

La inteligencia artificial se usa como una capa de analisis no como una fuente de datos.

FLUJO DE USO DE LA IA:

1.  El backend consolida los datos de ventas.
2.  Se calculan metricas agregadas(totales, promedios, variaciones).
3.  Se construye un resumen estructurado con los datos relevantes.
4.  El resumen se envia a gemini mediante un prompt controlado.
5.  Gemini devuelve:
    Insights en lenguaje natural.
    TEndencias detectadas.
    Recomendaciones.
6.  El resultado se guarda en la base de datos y se muestra en el dashboard.
    ENFOQUE:
    La AI no reemplaza la logica de negocio.

El Backend mantiene el control sobre que datos se envian, cuando se envian, como se interpretan los resultados.

Este enfoque simula un caso de Bussiness intelligence, donde los modelos se utilizan para interpretar datos consolidados, no para tomar decisiones directas.

PROMPT UTILIZADO:

Sos un analista senior de negocios especializado en dashboards de ventas.
Analizás insights ya validados, no los cuestionás.

CONTEXTO:

- Tipo: ${type}
- Periodo: ${periodKey}
- Severidad (1-5): ${severity}

MÉTRICAS:

- Variación de ingresos (%): ${metrics.revenueChangePct}
- Variación de órdenes (%): ${metrics.ordersChangePct}
- Variación del ticket promedio (%): ${metrics.avgOrderValueChangePct}

INSTRUCCIONES:
Devolvé EXCLUSIVAMENTE JSON válido con esta estructura exacta:

{
"summary": "string",
"explanation": "string",
"recommendation": "string",
"risks": ["string"],
"confidence": number,
"severity":number
}

REGLAS:

- No inventes métricas
- No repitas números
- No menciones AI ni modelos
- Sé claro y conciso
  `

🚀 Getting Started
Backend
npm install
npm start
Frontend
npm install
npm run dev
🧪 Project Status
✔️ Proyecto finalizado / Portfolio Project

DEPLOYMENT

El proyecto se despliega utilizando una arquitectura separada para frontend y backend.

FRONTEND(VITE + REACT)

-Plataforma: Vercel.
-Proceso: - Vercel detecta automaticamente vite. - Ejecuta automaticamente npm install y npm run build. - Sirve la aplicacion desde la carpeta /dist.

Variables de entorno:
VITE_API_URL:=https://<Backend-url>

La url se consume en el codigo mediante:
import.meta.env.VITE_API_URL

BACKEND(NODE.js + EXPRESS)

-Plataforma: Railway.
-Proceso: - El backend no requiere build. - Se ejecuta directamente con npm start - Mantiene activos los procesos node-cron para tareas automaticas

JOBS EN PRODUCCION

Los background jobs (semanales y mensuales) se ejecutan automaticamente mientras el backend este activo.
No se ejecutan servicios externos de scheduling.
Los snapshots, insights y AI insights segeneran y persisten en la base de datos.

📚 SKILLS DEMOSTRATED
Desarrollo Full Stack (MERN)

Consumo y diseño de APIs REST

Modelado de datos con MongoDB

Visualización de datos

Pensamiento analítico orientado a negocio

Código modular y mantenible

👤 Author
Fernando Otto

Proyecto desarrollado con fines de portfolio.

📌 Future Improvements
Predicción de ventas

Exportación de reportes (CSV / PDF)

Métricas avanzadas

Integración con datos en tiempo real
