export default {
    bind(el, { value }) {
        M.Tooltip.init(el, { html: value })
    },
    unbind(el) {
        const toltip = M.Tooltip.getInstance(el)

        if (toltip && toltip.destroy) {
            toltip.destroy()
        }
    }
}