<template>
    <div>
        <h3>Listado de Subastas</h3>
        <div class="hidden">
            <vs-row>
                <div class="contenedor" v-for="(item, index) in subastas" :key="index">

                    <CartaSubasta 
                    :subasta="item"
                    />

                </div>
            </vs-row>




        </div>

    </div>
</template>

<script>
import CartaSubasta from './CartaSubasta.vue';

export default {
    name: "SubastaWebListadoSubasta",
    data() {
        return {
            subastas:[]
        };
    },
    created() {
        this.listarsubastas()
    },
    methods: {
        listarsubastas() {
            this.axios.get(this.$store.getters.getLocalhost+'/subasta')
                .then((res) => {
                    this.subastas = res.data

                })
                .catch((e) => {
                    console.log(e.response);
                })
        },

    },
    components: { CartaSubasta }
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