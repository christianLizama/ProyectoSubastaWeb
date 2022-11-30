<template>
    <div>
        <div class="hidden">
            <vs-button color="#62B0F6" flat :active="true">
                <div>
                    <p>Objeto: {{ this.subasta.producto.nombreProducto }}</p>
                    <p v-if="(this.subasta.estado)">Estado: activa </p>
                    <p v-if="(!this.subasta.estado)">Estado: finalizado </p>
                    <vs-button color="#5576D4" flat :active="true">
                        <div class="hidden">
                            <p>Monto inicial: {{ this.subasta.producto.montoInicial }}</p>
                            <p>Ultima puja : {{  }}</p>
                        </div>

                    </vs-button>
                    <p>Usuario activos: 4 </p>
                    <p>Tiempo restante: {{ this.subasta.duracion}} seg</p>

                    <div v-if="this.valor == 'martillero'">
                        <vs-button color="dark">
                            Iniciar subasta
                        </vs-button>

                    </div>

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
    props: {
        subasta: [],
        valor: false
    },
    methods: {

    },
};
</script>

<style scoped>
.hidden {
    display: flex;
    justify-content: center;
    flex-direction: column;

}

.vs-button {
    text-align: left;

}
</style>