<template>
    <div>
        <div v-if="!subastaActiva">
            <h3>Listado de Subastas</h3>
            <div class="hidden">
                <vs-row>
                    <div class="contenedor" v-for="(item, index) in subastas" :key="index">
                        <div @click="chatSubasta(item)">
                            <CartaSubasta :subasta="item" :valor="bandera" />
                        </div>
                    </div>
                </vs-row>

            </div>
        </div>
        <div v-if="subastaActiva">
            <vs-button color="#F64942" @click="volver" style="position:absolute;left:50px;top: 28px;">
                Volver
            </vs-button>
            <Chat 
            :subastaActiva="this.chatSubastaActiva"
            />

        </div>
    </div>

</template>

<script>
import CartaSubasta from './CartaSubasta.vue';
import Chat from './Chat.vue';

export default {
    name: "SubastaWebListadoSubasta",
    data() {
        return {
            subastas: [],
            subastaActiva: false,
            chatSubastaActiva: {}
        };
    },
    props: {
        bandera: String
    },
    created() {
        this.listarsubastas()
    },
    methods: {
        listarsubastas() {
            this.axios.get('/subasta')
                .then((res) => {
                    this.subastas = res.data

                })
                .catch((e) => {
                    console.log(e.response);
                })
        },
        chatSubasta(subasta) {
            
            this.chatSubastaActiva = subasta;
            this.subastaActiva = true
        },
        volver(){
            this.subastaActiva = false;
        }

    },
    components: { CartaSubasta, Chat }
};
</script>

<style scoped>
.hidden {
    display: flex;
    position: relative;
    justify-content: space-around;

    width: 100%;
}

.contenedor {
    display: block;
    position: relative;
    flex-direction: column;
}

h3 {
    text-align: center;
}

.vs-row {
    position: relative;
    display: flex;
    left: 50px;
}
</style>