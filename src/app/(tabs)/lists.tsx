import { useState } from "react";
import { Container } from "@/components/ui/container";
import { View, Text, ScrollView, StyleSheet, SectionList, Image } from "react-native"
import { Dropdown } from 'react-native-element-dropdown'
import Checkbox from "expo-checkbox"
import { SafeAreaView } from "react-native-safe-area-context";


interface Item {
    title: string,
    data: string[]
}

interface DropDownItem {
    label: string,
    value: string
}

const ListScreen = () => {
    const [value, setValue] = useState<string | null>(null)
    const [isFocus, setIsFocus] = useState(false)
    const [checked, setChecked] = useState(false)

    const dropDownData: DropDownItem[] = [
        {
            label: 'item1',
            value: 'id1'
        },
        {
            label: 'item2',
            value: 'id2'
        },
        {
            label: 'item3',
            value: 'id3'
        }
    ]

    const data: Item[] = [
        {
            title: 'Category1',
            data: ['item1', 'item2', 'item3', 'item4']
        },
        {
            title: 'Category2',
            data: ['item1', 'item2', 'item3', 'item4']
        },
        {
            title: 'Category3',
            data: ['item1', 'item2', 'item3', 'item4']
        },
        {
            title: 'Category4',
            data: ['item1', 'item2', 'item3', 'item4']
        },
        {
            title: 'Category5',
            data: ['item1', 'item2', 'item3', 'item4']
        },
    ]
    return (
        <SafeAreaView>
            <ScrollView>

                <Container style={{
                    height: 250
                }}>
                    <Image style={styles.image} source={require('../../../assets/images/tutorial-web.png')} />
                </Container>
                <Container>
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        gap: 10
                    }}>
                        <Checkbox value={checked} onValueChange={value => {
                            setChecked(value)
                            console.log("Checkbox: ", value)
                        }} color={checked ? "#722b48" : undefined} />
                        <Text style={styles.label}>I agree with Terms</Text>
                    </View>

                </Container>
                <Container>
                    <Text style={styles.label}>Select option:</Text>
                    <Dropdown
                        style={[styles.dropdown, isFocus && {
                            borderLeftColor: "#3d1324",
                            borderTopColor: "#3d1324",
                        }]}
                        placeholderStyle={styles.placeholderText}
                        selectedTextStyle={styles.selectedText}
                        placeholder={!isFocus ? "Select item" : "..."}
                        data={dropDownData}
                        labelField={"label"}
                        valueField={"value"}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false)
                            console.log(item.value)
                        }}
                    />
                </Container>
                <Container>
                    <SectionList
                        sections={data}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <View style={styles.itemRow}>
                                <Text style={styles.itemText}>{item}</Text>
                            </View>
                        )}
                        renderSectionHeader={({ section: { title } }) => (
                            <View style={styles.headerRow}>
                                <Text style={styles.headerText}>{title}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => item + index}
                    />
                </Container>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
    dropdown: {
        height: 50,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderLeftColor: "#722b48",
        borderTopColor: "#722b48",
        borderRadius: 8,
        paddingHorizontal: 8
    },
    label: {
        fontSize: 16,
        marginBottom: 8
    },
    placeholderText: {
        fontSize: 16,
        color: '#999',
    },
    selectedText: {
        fontSize: 16
    },

    headerRow: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 10
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#333"
    },
    itemRow: {
        backgroundColor: "#f9f9f9",
        padding: 20,
        marginBottom: 5,
        borderRadius: 10,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderLeftColor: "#722b48",
        borderTopColor: "#722b48",
    },
    itemText: {
        fontSize: 16
    }
})

export default ListScreen;