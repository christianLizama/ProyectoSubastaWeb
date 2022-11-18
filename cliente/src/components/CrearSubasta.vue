<template>
    <div class="hidden">

        <div class="titulo">
            <h3>Crear Subasta</h3>
        </div>

        <vs-row justify="center">
            <div class="contenedor">

                <vs-select label="Seleccionar Producto" placeholder="Seleccionar Producto" v-model="subasta.producto">
                    <div v-for="(item, index) in items" :key="index">
                        <vs-option :label="item.nombreProducto" :value="item._id">
                            {{item.nombreProducto}}
                        </vs-option>
                    </div>

                </vs-select>
                <hr>
                <vs-input label="Duración de subasta" v-model="subasta.namesubasta" />
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
        }
    },
    methods: {
        agregarsubasta() {

            if (this.subasta.montoInicial != "" && this.subasta.namesubasta != "" && this.subasta.tiempo != "") {
                if (this.subasta.pass == this.passConfirmar) {
                    this.axios.post(this.$store.getters.getLocalhost + '/nuevo-subasta', this.subasta)
                        .then(res => {
                            this.subasta.namesubasta = ""

                            this.subasta.montoInicial = ""
                            this.subasta.tiempo = ""
                            this.openNotification("success", "Exito", "Nueva subasta agregado")
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