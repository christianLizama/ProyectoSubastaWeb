<template>
    <div>
        <div class="hidden">
            <vs-button color="#62B0F6" flat :active="true">
                <div >
                    <p>Objeto: {{this.subasta.nameProducto}}</p>
                    <p>Estado: {{this.subasta.estado}}</p>
                    <vs-button color="#5576D4" flat :active="true">
                        <div class="hidden">
                            <p>Monto inicial: {{this.subasta.montoInicial}}</p>
                            <p>Ultima puja : {{this.subasta.montoFinal}}</p>
                        </div>

                    </vs-button>
                    <p>Usuario activos: 4 </p>
                    <p>Tiempo restante: {{this.subasta.tiempo}} seg</p>
                </div>

            </vs-button>
        </div>

    </div>
</template>

<script>
export default {
    name: 'SubastaWebCartaSubasta',

    data() {
        return {

        };
    },

    mounted() {

    },
    props:{
        subasta:[]
    },
    methods: {

    },
};
</script>

<style scoped>
.hidden {
    display: flex;
    flex-direction: column;
    text-align: left;
    
}

.vs-button {
    text-align: left;
   
}
</style>