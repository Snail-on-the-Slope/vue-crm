<template>
  <div>
    <div class="page-title">
      <h3>{{ 'ProfileTitle' | localize }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHanler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
          v-model="name"
        />
        <label for="description">Имя</label>
        <span
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >Поле не должно быть пустым</span>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocal" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
import messages from '@/utils/messages'

export default {
  name: 'profile',
  data: () => ({
    name: '',
    isRuLocal: true
  }),
  validations: {
    name: { required }
  },
  mounted() {
    this.name = this.info.name
    this.isRuLocal = this.info.local === 'ru-RU'
    setTimeout(() => {
      M.updateTextFields()
    })
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHanler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.updateInfo({
          name: this.name,
          local: this.isRuLocal ? 'ru-RU' : 'en-US'
        })
        this.$message(messages['updateUserProfile'])
      } catch (e) {}
    }
  }
}
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>