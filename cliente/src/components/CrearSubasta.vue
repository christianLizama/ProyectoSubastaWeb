<template>
    <div class="hidden">

        <div class="titulo">
            <h3>Crear Subasta</h3>
        </div>

        <vs-row justify="center">
            <div class="contenedor">

                <vs-select label="Seleccionar Producto" placeholder="Seleccionar Producto" v-model="productoss">

                    <vs-option v-for="item in productos" :label="item.nombreProducto" :value="item._id">
                        {{ item.nombreProducto }}
                    </vs-option>


                </vs-select>
                <hr>

                <vs-input label="Duración de subasta" v-model="subasta.duracion" />
                <vs-button @click="agregarsubasta">Crear subasta</vs-button>
            </div>


            <vs-row>

            </vs-row>
        </vs-row>





    </div>
</template>

<script>

export default {
    data() {

        return {
            value: "",
            subasta: {
                ultimaPuja: null,
                duracion: null,
                estado: true,
                producto: null,
                chat: null
            },
            productos: [],
            produtoss:[]
        }
    },
    created() {
        this.listarProdutos();
    },
    methods: {
        agregarsubasta() {

            this.axios.post('/nuevo-subasta', this.subasta)
                .then(res => {
                    this.subasta.producto = null
                    this.subasta.duracion = null
                    this.openNotification("success", "Exito", "Nueva subasta agregado")
                })
                .catch((e) => {
                    console.log(e);

                })

        },
        listarProdutos() {
            this.axios.get('/producto')
                .then((res) => {
                    this.productos = res.data

                    res.data.forEach(element => {
                        this.productoss.push(element)
                    });
                    console.log(this.productoss[0].nombreProducto)
                })
                .catch((e) => {
                    console.log(e.response);
                })
        },
        openNotification(color, titulo, texto) {
            const noti = this.$vs.notification({
                sticky: true,
                color,
                position: "top-right",
                title: titulo,
                text: texto
            })
        }

    },

}
</script>

<style scoped>
.hidden {
    display: flex;
    flex-direction: column;
}

.vs-input-parent {
    padding: 10px;
}

.rol {
    padding: 9px 0 0 0;
}

.contenedor {
    display: flex;
    flex-direction: column;
}
</style>