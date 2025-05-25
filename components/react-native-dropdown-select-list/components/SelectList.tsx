import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
  Keyboard,
} from 'react-native';
import {SelectListProps} from '..'; // Adjust the import path as necessary
import {styles as appStyles} from '../../../styles/Styles'; // Import your styles
import {QuestType} from '../../../functions/System';
// Enable LayoutAnimation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ImprovedSelectList: React.FC<SelectListProps> = ({
  data,
  setSelected,
  placeholder = 'Select an option',
  boxStyles,
  inputStyles,
  dropdownStyles,
  dropdownItemStyles,
  dropdownTextStyles,
  maxHeight = 200,
  search = true,
  searchPlaceholder = 'Search...',
  notFoundText = 'No data found',
  onSelect = () => {},
  save = 'key',
  fontFamily,
  closeicon,
  arrowicon,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedOptionLabel, setSelectedOptionLabel] = useState<string | null>(
    null,
  );
  const [filteredOptions, setFilteredOptions] = useState(data);
  const dropdownHeight = useRef(new Animated.Value(0)).current;

  const inputRef = useRef<TextInput>(null);

  const getOptionLabel = (option: any) => option.value ?? option;

  const toggleDropdown = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsDropdownVisible(!isDropdownVisible);
  }, [isDropdownVisible]);

  const selectOption = useCallback(
    (option: any) => {
      const key = option.key ?? option.value ?? option;
      const value = option.value ?? option;

      setSelected(save === 'value' ? value : key);
      setSelectedOptionLabel(value);
      setSearchText('');
      setFilteredOptions(data); // Reset filtered options
      toggleDropdown();
      onSelect();
    },
    [data, save, setSelected, toggleDropdown, onSelect],
  );

  useEffect(() => {
    const transformedData = data.map((item: any, index: number) => ({
      key: item.key !== undefined ? item.key : index.toString(),
      value: item.value,
      name: item.name, // Include name if available
      disabled: item.disabled,
    }));
    setFilteredOptions(transformedData);
  }, [data]);

  useEffect(() => {
    if (isDropdownVisible) {
      Animated.timing(dropdownHeight, {
        toValue: maxHeight,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(dropdownHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isDropdownVisible, maxHeight, dropdownHeight]);

  useEffect(() => {
    const results = data.filter((item: any) =>
      getOptionLabel(item).toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredOptions(results);
  }, [searchText, data]);

  const renderOption = useCallback(
    (item: any, index: number) => (
      <TouchableOpacity
        key={index}
        style={[styles.dropdownItem, dropdownItemStyles]}
        onPress={() => selectOption(item)}>
        <Text
          style={[
            styles.dropdownText,
            dropdownTextStyles,
            {fontFamily, color: 'white', fontSize: 20},
          ]}>
          {getOptionLabel(item.name || item)}
        </Text>
      </TouchableOpacity>
    ),
    [dropdownItemStyles, dropdownTextStyles, fontFamily, selectOption],
  );

  return (
    <View style={styles.container}>
      {isDropdownVisible && search ? (
        <View style={[styles.wrapper, {...appStyles.textStyle, ...boxStyles}]}>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <TextInput
              ref={inputRef}
              value={searchText}
              placeholder={searchPlaceholder}
              onChangeText={setSearchText}
              style={[
                {
                  padding: 0,
                  height: 20,
                  flex: 1,
                  fontFamily,
                  color: 'white',
                  fontSize: 20,
                },
                inputStyles,
              ]}
              placeholderTextColor={inputStyles?.color || 'white'}
            />
            <TouchableOpacity onPress={toggleDropdown}>
              {!closeicon ? (
                <Image
                  source={require('../assets/images/close.png')}
                  resizeMode="contain"
                  style={{width: 17, height: 17, tintColor: 'white'}}
                />
              ) : (
                closeicon
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={[
            styles.wrapper,
            {
              backgroundColor: '#031b40',
              borderColor: 'white',
              borderWidth: 2,
              borderRadius: 0,
              paddingHorizontal: 20,
              paddingVertical: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              ...boxStyles,
            },
          ]}
          onPress={toggleDropdown}
          activeOpacity={0.8}>
          <Text
            style={[
              appStyles.textStyle,
              {fontSize: 20, width: 'auto', ...inputStyles},
            ]}>
            {placeholder || 'Main quests'}
          </Text>
          {!arrowicon ? (
            <Image
              source={require('../assets/images/chevron.png')}
              resizeMode="contain"
              style={{width: 20, height: 20, tintColor: 'white'}}
            />
          ) : (
            arrowicon
          )}
        </TouchableOpacity>
      )}

      <Animated.View
        style={[
          styles.dropdownContainer,
          {maxHeight: dropdownHeight, ...dropdownStyles},
        ]}>
        {isDropdownVisible && (
          <ScrollView keyboardShouldPersistTaps="handled">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(renderOption)
            ) : (
              <Text style={[styles.notFoundText, appStyles.textStyle]}>
                {notFoundText}
              </Text>
            )}
          </ScrollView>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  wrapper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownContainer: {
    position: 'relative',
    top: '0%',
    left: 0,
    right: 0,
    backgroundColor: '#031b40',
    borderRadius: 0,
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
    zIndex: 10,
    marginTop: 0,
  },
  dropdownItem: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    overflow: 'hidden',
    borderBottomWidth: 1,
    backgroundColor: '#031b40',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  notFoundText: {
    fontSize: 16,
    color: '#888',
    padding: 16,
    textAlign: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    marginRight: 8,
    color: 'white',
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
});

export default ImprovedSelectList;
