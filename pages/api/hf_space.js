
const get_space_info = async (space_id) => {
    try {
        const response = await fetch(`https://huggingface.co/api/spaces/${space_id}`)
        const json = await response.json()

        if (json.error) {
            return null
        }

        const dayjs = require('dayjs')
        const relativeTime = require('dayjs/plugin/relativeTime')
        dayjs.extend(relativeTime)
        const lastModified = dayjs(json.lastModified).fromNow()

        const author = json.author
        const title = json.cardData.title || 'Untitled'
        const emoji = json.cardData.emoji
        let colorFrom = json.cardData.colorFrom || 'pink'
        let colorTo = json.cardData.colorTo || 'purple'
        const likes = json.likes
        const sdk = json.sdk
        const runtime_stage = json.runtime.stage
        const current_hardware = json.runtime.hardware.current

        const colors = ['red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink', 'gray']
        if (!colors.includes(colorFrom)) {
            colorFrom = 'pink'
        }
        if (!colors.includes(colorTo)) {
            colorTo = 'purple'
        }

        const result = { space_id, author, title, emoji, lastModified, colorFrom, colorTo, likes, sdk, runtime_stage, current_hardware }

        console.debug("API response: ", result)

        return result

    } catch (error) {
        console.error(error)
        throw error
    }
}

export { get_space_info }
