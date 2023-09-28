using {disquera as my} from '../db/schema';

service CatalogServiceDisquera {
    entity Discos      as
        select from my.Discos {
            banda.nombre  as banda,
            nombre        as disco,
            canciones     as numero_Canciones,
            centro.nombre as centro
        }
}

service Grabaciones {

    entity Sesiones    as projection on my.Sesiones;
    entity Musicos    as projection on my.Musicos;



    entity Grabaciones as
        select from my.Discos {
            *,
            banda.nombre                      as banda,
            nombre                            as disco,
            banda.genero                      as genero,
            banda.musico.musico.nombre.nombre as nombreMusico,
            banda.musico.musico.apellido      as apellidoMusico,
            banda.disco.sesion.createdAt      as ultimaSesion,
            sesion.horasGrabacion             as horasGrabacion,
            sesion.promocion                  as promocion
        }
        excluding {
            createdAt,
            createdBy,
            modifiedAt,
            modifiedBy
        }
        order by
            ultimaSesion asc;
    // limit 1;


    action pAction(horasGrabacion : Integer);
    action createMusicos (musicos: array of Musicos);
    action deleteMusicos (deleteMusicos: array of String);
    function ConsultarMusico(ID: Musicos:ID) returns array of Musicos;
}
