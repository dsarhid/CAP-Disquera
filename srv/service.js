const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
  const {Grabaciones, Musicos, Sesiones} = this.entities;

    //   this.after('READ', 'Books', (each) => {
    //         if (each.stock > 11) {
    //             each.title += ' -- 11% discount!'
    //         }
    //     })

  this.after('READ', Sesiones, async data => {
    // const consultaSelect2 = await SELECT.from(Musicos);
    // console.log(consultaSelect2);
    // console.log(data);

    // try {
    //     if(data.promocion === 'true'){
    //         // each.promocion = true;
    //         console.log(`El Musico: ${consultaSelect2.nombre} gano 2 horas de grabación gratis por promoción!`);
    //     }else{
    //         console.log(`El Musico: ${consultaSelect2.nombre} no llego a la promocion.\n`);
    //     }
    // } catch (error) {
    //     console.error('Error en la función this.after:', error);
    // }

});

  this.before ('UPDATE', Sesiones, async req =>{
    console.log(req.data);
    const {ID, horasGrabacion} = req.data
    console.log('horas de grabacion:' + horasGrabacion);

    try {
        const consultaSelect = await SELECT.from(Sesiones, { ID });
        console.log('query: ', consultaSelect);
        
        if(consultaSelect) {
            if(horasGrabacion >= 6 && consultaSelect.promocion === false){
                req.data.promocion = true;
                req.data.horasGrabacion = horasGrabacion + 2;
            } else if (horasGrabacion < 6 && consultaSelect.promocion === true){
                req.data.promocion = false;
                req.data.horasGrabacion = horasGrabacion - 2;
            }
        } 
    } catch (error) {
        console.log('error -->' + error);
    }
    
})

this.on('createMusicos', async (req) => {
    console.log('Ingreso al ACTION "createMusicos"');
    const musicos = req.data.musicos;

    try {
        const createdMusicos = [];
        for (const musicoData of musicos) {

            const createMusico = await INSERT.into(Musicos).entries(musicoData);

            if (createMusico) {
                createdMusicos.push(musicoData);
                console.log('Músico creado con éxito:', musicoData);
            } else {
                console.log('Error al crear el músico.');
            }
        }

        console.log('Músicos creados con éxito:', createdMusicos);
    } catch (error) {
        console.error('Error en el ACTION "createMusicos":', error);
    }
});

this.on('deleteMusicos', async (req) => {
    console.log('Ingreso al ACTION deleteMusicos');
    const deleteMusicos = req.data.deleteMusicos;

    try {
        const deletedMusicos = [];
        for (const musicoData of deleteMusicos) {
            const deleteMusico = await DELETE.from(Musicos).where({ ID : musicoData});

            if (deleteMusico) {
                deletedMusicos.push(musicoData);
                console.log('\n\nMúsico eliminado con éxito:', musicoData);
            } else {
                console.log('Error al eliminar el músico.\n');
            }
        }
    } catch (error) {
        console.error('Error en el ACTION "createMusicos":', error);
    }
});

this.on('ConsultarMusico', async req => {
    console.log('Ingreso al FUNCTION');
    const {ID} = req.data;
    console.log(req.data);
    try {
        const consultaSelect = await SELECT.from(Musicos).where({ ID: ID });
        console.log(consultaSelect);
        const Musicos_return = [];
        return 1;
    } catch (error) {
        console.error('Error en el GET "ConsultarMusico":', error);
    }
    
  })
});