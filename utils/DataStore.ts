import AsyncStorage from '@react-native-async-storage/async-storage'

export namespace DataStore {
  export const removeItem = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key)

      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  export const saveString = async (key: string, stringValue: string) => {
    try {
      await AsyncStorage.setItem(key, stringValue)

      return true
    } catch (e) {
      console.error(e) // TODO: Sentry 생기면 Sentry 오류 로깅 추가
      return false
    }
  }

  export const saveBoolean = async (key: string, booleanValue: boolean) => {
    try {
      const stringifiedValue = JSON.stringify(booleanValue)
      await AsyncStorage.setItem(key, stringifiedValue)

      return true
    } catch (e) {
      console.error(e) // TODO: Sentry 생기면 Sentry 오류 로깅 추가
      return false
    }
  }

  export const saveNumber = async (key: string, numberValue: number) => {
    try {
      const stringifiedValue = JSON.stringify(numberValue)
      await AsyncStorage.setItem(key, stringifiedValue)

      return true
    } catch (e) {
      console.error(e) // TODO: Sentry 생기면 Sentry 오류 로깅 추가
      return false
    }
  }

  export const saveObject = async (key: string, objectValue: object) => {
    try {
      const stringifiedValue = JSON.stringify(objectValue)
      await AsyncStorage.setItem(key, stringifiedValue)

      return true
    } catch (e) {
      console.error(e) // TODO: Sentry 생기면 Sentry 오류 로깅 추가
      return false
    }
  }

  export const getString = async (key: string): Promise<string | null> => {
    try {
      const value = await AsyncStorage.getItem(key)

      return value
    } catch (e) {
      console.error(e) // TODO: Sentry 생기면 Sentry 오류 로깅 추가
      return null
    }
  }

  export const getBoolean = async (key: string): Promise<boolean | null> => {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value === null) {
        return null
      }

      const parsedValue = JSON.parse(value)

      return parsedValue
    } catch (e) {
      console.error(e) // TODO: Sentry 생기면 Sentry 오류 로깅 추가
      return null
    }
  }

  export const getNumber = async (key: string): Promise<number | null> => {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value === null) {
        return null
      }

      const parsedValue = JSON.parse(value)

      return parsedValue
    } catch (e) {
      console.error(e) // TODO: Sentry 생기면 Sentry 오류 로깅 추가
      return null
    }
  }

  export const getObject = async <T>(key: string): Promise<T | null> => {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value === null) {
        return null
      }

      const parsedValue = JSON.parse(value)

      return parsedValue
    } catch (e) {
      console.error(e) // TODO: Sentry 생기면 Sentry 오류 로깅 추가
      return null
    }
  }
}
