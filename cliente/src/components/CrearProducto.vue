<template>
    <div class="hidden">

        <div class="titulo">
            <h3>Crear producto</h3>
        </div>

        <vs-row justify="center">
            <div class="contenedor">
                <vs-input label="Nombre del Producto" v-model="producto.nameProducto" />
                <vs-input label="Monto Inicial" v-model="producto.montoInicial" />
                <vs-button @click="agregarproducto">Crear producto</vs-button>
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
            producto: {
                nombreProducto: "",
                montoInicial: null,
            },
        }
    },
    methods: {
        agregarproducto() {

            if (this.producto.montoInicial != "" && this.producto.nameProducto != "" && this.producto.tiempo != "") {
                if (this.producto.pass == this.passConfirmar) {
                    this.axios.post(this.$store.getters.getLocalhost + '/nuevo-producto', this.producto)
                        .then(res => {
                            this.producto.nameProducto = ""

                            this.producto.montoInicial = ""
                            this.producto.tiempo = ""
                            this.openNotification("success", "Exito", "Nueva producto agregado")
                        })
                        .catch((e) => {
                            console.log(e);

                        })
                }
                else {
                    this.openNotification("danger", "Error", "Las contraseñas no coinciden.")

                }

            }
            else {
                this.openNotification("danger", "Error", "Falta informcion.")

            }


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