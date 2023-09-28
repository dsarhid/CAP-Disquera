Disquera
Una disquera requiere que realicemos un sistema donde tendremos un control de entidades con las siguientes características:
-   Un músico puede estar en varias bandas/agrupaciones
-   Una banda puede tener 1 o más discos y 1 disco puede tener sólo 1 banda.
-   Un disco puede estar en varios centros de distribución
-   Almacenar las horas de grabación de cada músico, cada sesión pertenece a 1 disco (manejarlas como composition). Incluir un aspect para guardar que usuario y a que hora crean la sesión del músico usando @sap/cds/common

Nota: Algunas otras entidades podrían estar vinculadas por medio de compositions pero en este ejemplo sólo realizaremos la anteriormente pedida para poder ver las diferencias que existe entre compositions y associations.
Utilizar al menos 1 type, ID autogenerados
Genere la mock data de cada entidad
Views:
1.  Generar una vista en donde estén reflejados los siguientes elementos: nombre de la banda, nombre del disco, cantidad de canciones del disco y quién distribuye el mismo.
2.  Generar una vista de la entidad de ‘Grabaciones’, incluir nombre del disco, nombre de la banda y género, además del nombre y apellido del músico. Mostrar 1 sólo registro, el cual será el registro más reciente que haya recibido promoción. Excluir de la vista los siguientes elementos: createdAt, createdBy, modifiedAt, modifiedBy
-   Generar las vistas que necesite para poder completar la consigna satisfactoriamente