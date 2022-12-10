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
                            <p v-if="this.subasta.ultimaPuja != null">Ultima puja : {{ this.subasta.ultimaPuja.monto }}</p>
                            <p v-else>Ultima puja : {{ this.subasta.producto.montoInicial }}</p>
                        </div>

                    </vs-button>

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
        valor: false,
        cantParticipante: 0,
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