export const IS_LOADING = 'IS_LOADING'
export const IS_SUCCESS = 'IS_SUCCESS'
export const IS_FAILED = 'IS_FAILED'

export function showLoading () {
    return {
      type: IS_LOADING
    }
  }