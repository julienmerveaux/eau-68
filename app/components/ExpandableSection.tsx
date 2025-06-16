import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
    children: React.ReactNode;
    header: React.ReactNode;
    initiallyExpanded?: boolean;
}

export default function ExpandableSection({ children, header, initiallyExpanded = false }: Props) {
    const [expanded, setExpanded] = useState(initiallyExpanded);

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {header}
                <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                    <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color="black" />
                </TouchableOpacity>
            </View>

            {expanded && (
                <View style={{ marginTop: 10 }}>
                    {children}
                </View>
            )}
        </View>
    );
}
