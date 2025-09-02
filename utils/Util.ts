import { Image, ImageSourcePropType } from 'react-native'

export const isObject = (value: any): boolean => {
  if (typeof value === 'object' && value !== null) {
    return true
  }
  return false
}

export const isEmptyObject = (value: object): boolean => {
  return value === null || Object.keys(value).length === 0
}

export const isEmptyString = (value: string | null | undefined): boolean => {
  return value === null || value === undefined || value.trim() === ''
}

export const getResizedImageSize = (image: ImageSourcePropType, targetWidth: number) => {
  const { width, height } = Image.resolveAssetSource(image)
  const resizedHeight = (targetWidth / width) * height
  return { width: targetWidth, height: resizedHeight }
}

/* (size)*(열)로 보여줘야 하는 경우, null일 때 empty로 자리 채우기(선택) */
export const chunkArray = <T>(arr: T[], size = 3): (T | null)[][] => {
  const result: (T | null)[][] = []
  for (let i = 0; i < arr.length; i += size) {
    const chunk: (T | null)[] = arr.slice(i, i + size)
    while (chunk.length < size) {
      chunk.push(null)
    }
    result.push(chunk)
  }
  return result
}
